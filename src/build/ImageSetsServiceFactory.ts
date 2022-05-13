import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { ImageSetsMongoDbPersistence } from '../persistence/ImageSetsMongoDbPersistence';
import { ImageSetsFilePersistence } from '../persistence/ImageSetsFilePersistence';
import { ImageSetsMemoryPersistence } from '../persistence/ImageSetsMemoryPersistence';
import { ImageSetsController } from '../logic/ImageSetsController';
import { ImageSetsHttpServiceV1 } from '../services/version1/ImageSetsHttpServiceV1';

export class ImageSetsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-imagesets", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-imagesets", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-imagesets", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-imagesets", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-imagesets", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-imagesets", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(ImageSetsServiceFactory.MemoryPersistenceDescriptor, ImageSetsMemoryPersistence);
		this.registerAsType(ImageSetsServiceFactory.FilePersistenceDescriptor, ImageSetsFilePersistence);
		this.registerAsType(ImageSetsServiceFactory.MongoDbPersistenceDescriptor, ImageSetsMongoDbPersistence);
		this.registerAsType(ImageSetsServiceFactory.ControllerDescriptor, ImageSetsController);
		this.registerAsType(ImageSetsServiceFactory.HttpServiceDescriptor, ImageSetsHttpServiceV1);
	}
	
}
