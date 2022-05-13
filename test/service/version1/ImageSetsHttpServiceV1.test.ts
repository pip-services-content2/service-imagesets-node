const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { ImageSetV1 } from '../../../src/data/version1/ImageSetV1';
import { ImageSetsMemoryPersistence } from '../../../src/persistence/ImageSetsMemoryPersistence';
import { ImageSetsController } from '../../../src/logic/ImageSetsController';
import { ImageSetsHttpServiceV1 } from '../../../src/services/version1/ImageSetsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let IMAGESET1 = <ImageSetV1>{
    id: '1',
    title: 'ImageSet 1',
    pics: [{ id: '111' },{ id: '222' },{ id: '333' }]
};
let IMAGESET2 = <ImageSetV1>{
    id: '2',
    tags: ['TAG 1'],
    all_tags: ['tag1'],
    title: 'ImageSet 2',
    pics: [{ id: '444' }, { id: '555' }, { id: '666' }]
};

suite('ImageSetsHttpServiceV1', ()=> {
    let service: ImageSetsHttpServiceV1;

    let rest: any;

    suiteSetup(async () => {
        let persistence = new ImageSetsMemoryPersistence();
        let controller = new ImageSetsController();

        service = new ImageSetsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-imagesets', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-imagesets', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-imagesets', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('CRUD Operations', async () => {
        let imageset1, imageset2;

        // Create one imageset
        let imageset = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/imagesets/create_imageset',
                {
                    imageset: IMAGESET1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(imageset);
        assert.equal(imageset.title, IMAGESET1.title);
        assert.sameDeepMembers(imageset.pics, IMAGESET1.pics);

        imageset1 = imageset;

        // Create another imageset
        imageset = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/imagesets/create_imageset',
                {
                    imageset: IMAGESET2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(imageset);
        assert.equal(imageset.title, IMAGESET2.title);
        assert.sameDeepMembers(imageset.pics, IMAGESET2.pics);

        imageset2 = imageset;

        // Get all imagesets
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/imagesets/get_imagesets',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the imageset
        imageset1.title = 'New Title 1';

        imageset = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/imagesets/update_imageset',
                {
                    imageset: imageset1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(imageset);
        assert.equal(imageset.title, 'New Title 1');
        assert.sameDeepMembers(imageset.pics, imageset1.pics);

        imageset1 = imageset;


        // Delete imageset
        await new Promise<any>((resolve, reject) => {
            rest.post('/v1/imagesets/delete_imageset_by_id',
                {
                    imageset_id: imageset1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // Try to get delete imageset
        imageset = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/imagesets/delete_imageset_by_id',
                {
                    imageset_id: imageset1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(imageset || null);
    });
});