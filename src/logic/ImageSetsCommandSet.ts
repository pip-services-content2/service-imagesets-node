import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { ImageSetV1Schema } from '../data/version1/ImageSetV1Schema';
import { IImageSetsController } from './IImageSetsController';

export class ImageSetsCommandSet extends CommandSet {
    private _logic: IImageSetsController;

	constructor(logic: IImageSetsController) {
		super();

		this._logic = logic;

		// Register commands to the database
		this.addCommand(this.makeGetImageSetsCommand());
		this.addCommand(this.makeGetImageSetByIdCommand());
		this.addCommand(this.makeCreateImageSetCommand());
		this.addCommand(this.makeUpdateImageSetCommand());
		this.addCommand(this.makeDeleteImageSetByIdCommand());
	}

	private makeGetImageSetsCommand(): ICommand {
		return new Command(
			"get_imagesets",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			async (correlationId: string, args: Parameters) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				return await this._logic.getImageSets(correlationId, filter, paging);
			}
		);
	}

	private makeGetImageSetByIdCommand(): ICommand {
		return new Command(
			"get_imageset_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('imageset_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
				let imagesetId = args.getAsNullableString("imageset_id");
				return await this._logic.getImageSetById(correlationId, imagesetId);
			}
		);
	}

	private makeCreateImageSetCommand(): ICommand {
		return new Command(
			"create_imageset",
			new ObjectSchema(true)
				.withRequiredProperty('imageset', new ImageSetV1Schema()),
			async (correlationId: string, args: Parameters) => {
				let imageset = args.get("imageset");
				return await this._logic.createImageSet(correlationId, imageset);
			}
		);
	}

	private makeUpdateImageSetCommand(): ICommand {
		return new Command(
			"update_imageset",
			new ObjectSchema(true)
				.withRequiredProperty('imageset', new ImageSetV1Schema()),
			async (correlationId: string, args: Parameters) => {
				let imageset = args.get("imageset");
				return await this._logic.updateImageSet(correlationId, imageset);
			}
		);
	}

	private makeDeleteImageSetByIdCommand(): ICommand {
		return new Command(
			"delete_imageset_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('imageset_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
				let imagesetId = args.getAsNullableString("imageset_id");
				return await this._logic.deleteImageSetById(correlationId, imagesetId);
			}
		);
	}

}