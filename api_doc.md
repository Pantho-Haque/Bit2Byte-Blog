4.2 Read event

1. EndPoint
   /api/v1/read_event
2. Type: GET
3. Params
   (a) event name : String
4. Authority: Public
5. Sample request
   localhost:8080/api/v1/read_event?event_name=bit2console-2024
6. Sample response
   {
   "data": {
   "event_name": "bit2console-2024",
   "image": "https://localhost:8080/public/photos/event/bit2console-2024.jpg",
   "short_desc": "short desc",
   "date": "25/02/2025",
   "venue": "Academic building",
   "images_with_text": [
   {
   "image": "https://localhost:8080/public/photos/event/bit2console-2024_0.jpg",
   "text": "3"
   },
   {
   "image": "https://localhost:8080/public/photos/event/bit2console-2024_1.png",
   "text": "2"
   }
   ]
   },
   "message": "Read successful",
   "success": true
   }


4.3 Read events

1. EndPoint
   /api/v1/read_events
2. Type: GET
3. Params
   (a) page: Integer - page number(Optional)
   (b) item per page: Integer - items per page
4. Authority: Public
5. Sample request
   localhost:8080/api/v1/read_events
6. Sample response
   {
   "data": {
   "item_count": 1,
   "page_no": 0,
   "items": [
   {
   "event_name": "bit2console-2024",
   "image": "https://localhost:8080/public/photos/event/bit2console-2024.jpg",
   "short_desc": "short desc",
   "date": "25/02/2025",
   "venue": "Academic building"
   }
   ],
   "total_pages": 1
   },
   "message": "Data read successful",
   "success": true
   }
