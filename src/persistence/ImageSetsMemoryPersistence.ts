import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';
import { MultiString } from 'pip-services3-commons-nodex';
import { TagsProcessor } from 'pip-services3-commons-nodex';

import { ImageSetV1 } from '../data/version1/ImageSetV1';
import { IImageSetsPersistence } from './IImageSetsPersistence';

export class ImageSetsMemoryPersistence 
    extends IdentifiableMemoryPersistence<ImageSetV1, string> 
    implements IImageSetsPersistence {

    constructor() {
        super();
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchMultiString(item: MultiString, search: string): boolean {
        if (item == null) return false;

        for (let prop in item) {
            if (this.matchString(item[prop], search))
                return true;
        }

        return false;
    }

    private matchSearch(item: ImageSetV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.title, search))
            return true;
        return false;
    }

    private contains(array1: string[], array2: string[]): boolean {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let tagsString = filter.get('tags');
        let tags = tagsString != null ? TagsProcessor.compressTags([tagsString]) : null;

        return (item: ImageSetV1) => {
            if (id != null && id != item.id)
                return false;
            if (tags != null && !this.contains(item.all_tags, tags))
                return false;
            if (search != null && !this.matchSearch(item, search))
                return false;
            return true;
        };
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ImageSetV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

}
