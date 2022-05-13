const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';

import { ImageSetV1 } from '../../src/data/version1/ImageSetV1';
import { ImageSetsLambdaFunction } from '../../src/container/ImageSetsLambdaFunction';

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

suite('ImageSetsLambdaFunction', ()=> {
    let lambda: ImageSetsLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-imagesets:persistence:memory:default:1.0',
            'controller.descriptor', 'service-imagesets:controller:default:default:1.0'
        );

        lambda = new ImageSetsLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('CRUD Operations', async () => {
        let imageset1, imageset2;

        // Create one imageset
        let imageset = await lambda.act(
            {
                role: 'imagesets',
                cmd: 'create_imageset',
                imageset: IMAGESET1
            }
        );

        assert.isObject(imageset);
        assert.equal(imageset.title, IMAGESET1.title);
        assert.sameDeepMembers(imageset.pics, IMAGESET1.pics);

        imageset1 = imageset;

        // Create another imageset
        imageset = await lambda.act(
            {
                role: 'imagesets',
                cmd: 'create_imageset',
                imageset: IMAGESET2
            }
        );

        assert.isObject(imageset);
        assert.equal(imageset.title, IMAGESET2.title);
        assert.sameDeepMembers(imageset.pics, IMAGESET2.pics);

        imageset2 = imageset;

        // Get all imagesets
        let page = await lambda.act(
            {
                role: 'imagesets',
                cmd: 'get_imagesets'
            }
        );
        
        assert.isObject(page);
        assert.lengthOf(page.data, 2);


        // Update the imageset
        imageset1.title = 'New Title 1';

        imageset = await lambda.act(
            {
                role: 'imagesets',
                cmd: 'update_imageset',
                imageset: imageset1
            }
        );

        assert.isObject(imageset);
        assert.equal(imageset.title, 'New Title 1');
        assert.sameDeepMembers(imageset.pics, IMAGESET1.pics);

        imageset1 = imageset;

        // Delete imageset
        await lambda.act(
            {
                role: 'imagesets',
                cmd: 'delete_imageset_by_id',
                imageset_id: imageset1.id
            }
        );

        // Try to get delete imageset
        imageset = await lambda.act(
            {
                role: 'imagesets',
                cmd: 'get_imageset_by_id',
                imageset_id: imageset1.id
            }
        );

        assert.isNull(imageset || null);
    });
});