# HTTP REST Protocol (version 1) <br/> ImageSets Microservice

ImageSets microservice implements a HTTP compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [ImageSetV1 class](#class1)
* [POST /imagesets/get_announcemets](#operation1)
* [POST /imagesets/get_imageset_by_id](#operation2)
* [POST /imagesets/create_imageset](#operation3)
* [POST /imagesets/update_imagesets](#operation4)
* [POST /imagesets/delete_imagesets_by_id](#operation5)

## Data types

### <a name="class4"></a> ImageSetV1 class

Represents an image set market with tags. 

**Properties:**
- id: string - unique imageset id
- create_time: Date - date and time when imageset was created
- title: string - imageset title
- pic_ids: [string] - (optional) array of picture block ids in storage attached to this imageset
- tags: [string] - (optional) explicit tags with annoucement topic for searching
- all_tags: [string] - (readonly) normalized array of explicit and hash tags used by search

## Operations

### <a name="operation1"></a> Method: 'POST', route '/imagesets/get_imagesets'

Retrieves a list of imagesets by specified criteria

**Request body:** 
- filter: object - filter parameters
  - tags: [string] - search tags
  - search: string - string for full text search in title, content and creator name
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
DataPage<ImageSetV1> or error

### <a name="operation2"></a> Method: 'POST', route '/imagesets/get\_imageset\_by\_id'

Retrieves a single imageset specified by its unique id

**Request body:** 
- imageset_id: string - unique imageset id

**Response body:**
ImageSetV1 object, null if object wasn't found or error 

### <a name="operation3"></a> Method: 'POST', route '/imagesets/create_imageset'

Creates a new system imageset

**Request body:**
- imageset: ImageSetV1 - ImageSet to be created. If object id is not defined it is assigned automatically.

**Response body:**
Created ImageSetV1 object or error

### <a name="operation4"></a> Method: 'POST', route '/imagesets/update_imageset'

Updates system imageset

**Request body:**
- imageset: ImageSetV1 - ImageSet to be updated

**Response body:**
Updated ImageSetV1 object or error 
 
### <a name="operation5"></a> Method: 'POST', route '/imagesets/delete\_imageset\_by\_id'

Deletes system imageset specified by its unique id

**Request body:** 
- imageset_id: string - unique imageset id

**Response body:**
Deleted ImageSetV1 object or error 
 
