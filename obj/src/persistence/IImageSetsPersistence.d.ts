import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';
import { ImageSetV1 } from '../data/version1/ImageSetV1';
export interface IImageSetsPersistence extends IGetter<ImageSetV1, string>, IWriter<ImageSetV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ImageSetV1>>;
    getOneById(correlationId: string, id: string): Promise<ImageSetV1>;
    create(correlationId: string, item: ImageSetV1): Promise<ImageSetV1>;
    update(correlationId: string, item: ImageSetV1): Promise<ImageSetV1>;
    deleteById(correlationId: string, id: string): Promise<ImageSetV1>;
}
