# ImageSets Microservice

This is a system imagesets microservice from Pip.Services library. 
It allows system administrators and product owners to communicate to users key system events and product updates.
Each imageset:
- Can be written in multiple languages
- Can include pictures and document attachments
- Supports editing lifecycle via status tracking

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process
* External APIs: HTTP/REST, AWS Lambda
* Persistence: In-Memory, Flat Files, MongoDB

This microservice has dependencies on the following microservices:
- [service-attachments](https://github.com/pip-services-content2/service-attachments-node) - to reference pictures and documents associates with imagesets

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-content2/client-imagesets-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)

##  Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class ImageSetV1 implements IStringIdentifiable {
    /* Identification */
    public id: string;

    /* Automatically set fields */
    public create_time: Date;

    /* Content */
    public title: string;
    public pic_ids?: string[];

    /* Search */
    public tags?: string[];
    public all_tags?: string[];
}

interface IImageSetsV1 {
    getImageSets(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ImageSetV1>>;

    getImageSetById(correlationId: string, imagesetId: string): Promise<ImageSetV1>;

    createImageSet(correlationId: string, imageset: ImageSetV1): Promise<ImageSetV1>;

    updateImageSet(correlationId: string, imageset: ImageSetV1): Promise<ImageSetV1>;

    deleteImageSetById(correlationId: string, imagesetId: string): Promise<ImageSetV1>;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-content2/service-imagesets-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yaml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yaml** file. 

Example of microservice configuration
```yaml
---
- descriptor: "pip-services:logger:console:default:1.0"
  level: "trace"

- descriptor: "service-imagesets:persistence:file:default:1.0"
  path: "./data/imagesets.json"

- descriptor: "service-imagesets:controller:default:default:1.0"

- descriptor: "service-attachments:client:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8082

- descriptor: "service-imagesets:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "client-imagesets-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
let sdk = new require('client-imagesets-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
let config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.ImageSetsHttpClientV1(config);

// Connect to the microservice
try {
    await client.open(null);
    // Work with the microservice
    ...
} catch(err) {
    console.error('Connection to the microservice failed');
    console.error(err);
}
```

Now the client is ready to perform operations
```javascript
// Create a new imageset
let imageset = await client.createImageSet(
    null,
    { 
        title: 'Cars',
        tags: ['car', 'cars', 'cartoon'],
        pic_ids: ['111', '222', '333']
    }
);
```

```javascript
// Search for car images
let page = await client.getImageSets(
    null,
    {
        tags: 'cars'
    },
    null
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.

