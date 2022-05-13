const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { IImageSetsPersistence } from '../../src/persistence/IImageSetsPersistence';
import { ImageSetV1 } from '../../src/data/version1/ImageSetV1';

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
let IMAGESET3 = <ImageSetV1>{
    id: '3',
    tags: ['Tag 1', 'tag 2'],
    all_tags: ['tag1', 'tag2'],
    title: 'ImageSet 3',
    pics: [{ id: '777' }]
};

export class ImageSetsPersistenceFixture {
    private _persistence: IImageSetsPersistence;
    
    constructor(persistence: IImageSetsPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public async createImageSets() {
        // Create one imageset
        let imageset = await this._persistence.create(null, IMAGESET1);

        assert.isObject(imageset);
        assert.equal(imageset.title, IMAGESET1.title);
        assert.sameDeepMembers(imageset.pics, IMAGESET1.pics);

        // Create another imageset
        imageset = await this._persistence.create(null, IMAGESET2);

        assert.isObject(imageset);
        assert.equal(imageset.title, IMAGESET2.title);
        assert.sameDeepMembers(imageset.pics, IMAGESET2.pics);

        // Create yet another imageset
        imageset = await this._persistence.create(null, IMAGESET3);


        assert.isObject(imageset);
        assert.equal(imageset.title, IMAGESET3.title);
        assert.sameDeepMembers(imageset.pics, IMAGESET3.pics);
    }
                
    public async testCrudOperations() {
        let imageset1: ImageSetV1;

        // Create items
        await this.createImageSets();

        // Get all imagesets
        let page = await this._persistence.getPageByFilter(
            null,
            new FilterParams(),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        imageset1 = page.data[0];

        // Update the imageset
        imageset1.title = 'New Title 1';

        let imageset = await this._persistence.update(null, imageset1);

        assert.isObject(imageset);
        assert.equal(imageset.title, 'New Title 1');
        assert.sameDeepMembers(imageset.pics, imageset1.pics);

        // Delete imageset
        await this._persistence.deleteById(null, imageset1.id);

        // Try to get delete imageset
        imageset = await this._persistence.getOneById(null, imageset1.id);

        assert.isNull(imageset || null);
    }

    public async testGetWithFilter() {
        // Create items
        await this.createImageSets();

        // Get imagesets filtered by tags
        let imagesets = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                tags: ['tag1']
            }),
            new PagingParams()
        );

        assert.isObject(imagesets);
        assert.lengthOf(imagesets.data, 2);

        // Get imagesets filtered by title
        imagesets = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                search: IMAGESET3.title
            }),
            new PagingParams()
        );

        assert.isObject(imagesets);
        assert.lengthOf(imagesets.data, 1);
    }

}
