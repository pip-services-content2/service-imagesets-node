import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ImageSetV1 } from '../data/version1/ImageSetV1';
export interface IImageSetsController {
    getImageSets(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ImageSetV1>>;
    getImageSetById(correlationId: string, imagesetId: string): Promise<ImageSetV1>;
    createImageSet(correlationId: string, imageset: ImageSetV1): Promise<ImageSetV1>;
    updateImageSet(correlationId: string, imageset: ImageSetV1): Promise<ImageSetV1>;
    deleteImageSetById(correlationId: string, imagesetId: string): Promise<ImageSetV1>;
}
