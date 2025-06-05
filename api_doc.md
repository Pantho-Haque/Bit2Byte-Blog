
2 Blog Controller
2.1 Save blog info

1. EndPoint:
   /api/v1/save_blog_info
2. Type: POST
3. Form data:
   • blog info : JSON
   – id : Integer - ID of the blog
   – topic id: Integer - ID of the topic under which the blog falls.
   – sub topic id: Integer - ID of the sub-topic under which the blog falls.
   – title: String
   – written by: String - username of the author
   – short desc : String
   – approved by: String - username of the verifier
   • image : File
4. Authority: ADMIN, MENTOR, TA
5. Details:
   (a) To save the info of a blog except the content
6. Sample blog info json: Make sure to pass the image also as another form field.
   {
   "id":3333,
   "topic_id": 999,
   "sub_topic_id":1111,
   "title":"23 feb",
   "written_by":"saeed1907057",
   "short_desc":"There is nothing but light",
   "approved_by":"saeed1907057"
   }
7. Sample Response:
   {
   "data": {
   "id": 3333,
   "topic_id": 999,
   "sub_topic_id": 1111,
   "title": "23 feb",
   "image": null,
   "author_image": "https://localhost:8080/public/photos/saeed1907057.png",
   "last_updated": 1740341771536,
   "creation_time": 1740341771536,
   "written_by": "saeed1907057",
   "short_desc": "There is nothing but light",
   "approved_by": "saeed1907057"
   },
   "message": "Blog info saved successfully",
   "success": true
   }

5

2.2 Read blog info

1. EndPoint:
   /api/v1/read_blog_info
2. Type: GET
3. Params:
   • blog id: Integer
4. Authority: ADMIN, MENTOR, TA, USER
5. Sample request
   localhost:8080/api/v1/read_blog_info?blog_id=3333
6. Sample Response
   {
   "data": {
   "id": 3333,
   "topic_id": 999,
   "sub_topic_id": 1111,
   "title": "23 feb",
   "image": null,
   "author_image": "https://localhost:8080/public/photos/saeed1907057.png",
   "last_updated": 1740341771536,
   "creation_time": 1740341771536,
   "written_by": "saeed1907057",
   "short_desc": "There is nothing but light",
   "approved_by": "saeed1907057"
   },
   "message": "Operation successful",
   "success": true
   }

6

2.3 Update blog info

1. EndPoint
   /api/v1/update_blog_info
2. Type: POST
3. Form data:
   • blog info : JSON
   – id : Integer - ID of the blog
   – topic id: Integer - ID of the topic under which the blog falls.
   – sub topic id: Integer - ID of the sub-topic under which the blog falls.
   – title: String
   – written by: String - username of the author
   – short desc : String
   – approved by: String - username of the verifier
   • image : File
4. Authority: ADMIN, MENTOR, TA
5. Details:
   (a) To update the info of a blog except the content
6. Sample blog info json: Make sure to pass the image also as another form field.
   {
   "id":3333,
   "topic_id": 999,
   "sub_topic_id":1111,
   "title":"23 feb",
   "written_by":"saeed1907057",
   "short_desc":"There is nothing but light",
   "approved_by":"saeed1907057"
   }
7. Sample Response:
   {
   "data": {
   "id": 3333,
   "topic_id": 999,
   "sub_topic_id": 1111,
   "title": "23 feb",
   "image": null,
   "author_image": "https://localhost:8080/public/photos/saeed1907057.png",
   "last_updated": 1740341771536,
   "creation_time": 1740341771536,
   "written_by": "saeed1907057",
   "short_desc": "There is nothing but light",
   "approved_by": "saeed1907057"
   },
   "message": "Blog info saved successfully",
   "success": true
   }

7

2.4 Delete blog

1. EndPoint
   /api/v1/delete_blog
2. Type: POST
3. Params:
   • blog id: Integer
4. Authority: ADMIN, MENTOR, TA
5. Details:
   (a) It deletes both blog info and content.
6. Sample request
   /api/v1/delete_blog?blog_id=3333
7. Sample Response
   {
   "data": {
   "id": 3333,
   "topic_id": 999,
   "sub_topic_id": 1111,
   "title": "23 feb",
   "image": null,
   "author_image": "https://localhost:8080/public/photos/saeed1907057.png",
   "last_updated": 1740342389729,
   "creation_time": 1740341771536,
   "written_by": "saeed1907057",
   "short_desc": "There is nothing but light",
   "approved_by": "saeed1907057"
   },
   "message": "Successfully deleted",
   "success": true
   }

8

2.5 Save blog details

1. EndPoint
   /api/v1/save_blog_details
2. Type: POST
3. Form data
   • id: Integer - id of the blog
   • content: String - content of the blog / readme file.
4. Authority: ADMIN, MENTOR, TA
5. Details
   (a) To save the content of the blog only.
6. Sample form data
   {
   "id":2222,
   "content": "This is my name how are you?"
   }
7. Sample response
   {
   "data": {
   "blogId": 2222,
   "content": "This is my...w are you?"
   },
   "message": "Successfully saved",
   "success": true
   }

9

2.6 Update blog details

1. EndPoint
   /api/v1/update_blog_details
2. Type: POST
3. Form data
   • id: Integer - id of the blog
   • content: String - content of the blog / readme file.
4. Authority: ADMIN, MENTOR, TA
5. Details
   (a) To update the content of the blog only.
6. Sample form data
   {
   "id":2222,
   "content": "This is my name how are you?"
   }
7. Sample response
   {
   "data": {
   "blogId": 2222,
   "content": "This is my...w are you?"
   },
   "message": "Successfully updated",
   "success": true
   }
   2.7 Save photo and get link
8. EndPoint
   /api/v1/get_instant_photo_link
9. Type: POST
10. Form data
    • photo
11. Authority: ADMIN, MENTOR, TA
12. Details
    (a) Used for adding image to blog when writing the blog.
13. Sample response
    {
    "data": "https://localhost:8080/public/photos/instant/1740343354874.png",
    "message": "File uploaded successfully",
    "success": true
    }

10

3 Blog Reader Controller
3.1 Read syllabus

1. EndPoint:
   /api/v1/read_syllabus
2. Type: GET
3. Params: None
4. Authority: Public
5. Details:
   (a) To read the syllabus that contains list of topics and nested subtopics.
   (b) Topics and Subtopics are sorted by serial.
6. Sample response:
   {
   "data": [
   {
   "topicInfo": {
   "id": 1,
   "topicName": "C",
   "noOfSubTopics": 9,
   "serial": 1
   },
   "subtopicInfos": [
   {
   "id": 1,
   "topicInfo": {
   "id": 1,
   "topicName": "C",
   "noOfSubTopics": 9,
   "serial": 1
   },
   "subTopicName": "Introduction to C",
   "serial": 1
   },
   {
   "id": 2,
   "topicInfo": {
   "id": 1,
   "topicName": "C",
   "noOfSubTopics": 9,
   "serial": 1
   },
   "subTopicName": "Variables",
   "serial": 2
   }
   ]
   }
   ],
   "message": "Operation successful"
   }

11

3.2 Read blog list

1. EndPoint:
   /api/v1/read_blogs
2. Type: GET
3. Params:
   • page: Integer - Page number(Optional). Default = 0.
   • item per page: Integer - Number of items per page to return. Default = 12.
4. Authority: Public
5. Details:
   • Read the 12 blogs per page with page number.
6. Sample Response:
   {
   "data": {
   "itemCount": 2,
   "pageNo": 0,
   "items": [
   {
   "id": 1,
   "topicId": 1,
   "subTopicId": 1,
   "title": "Loop",
   "image": "blog_info_image_1.png",
   "lastUpdated": 1730394611727,
   "creationTime": 1730380289779,
   "writtenBy": "saeed1907057",
   "shortDesc": "Introduction to loop in C",
   "approvedBy": "saeed1907057"
   },
   {
   "id": 2,
   "topicId": 1,
   "subTopicId": 2,
   "title": "sd",
   "image": null,
   "lastUpdated": 1730380289777,
   "creationTime": 1730380289779,
   "writtenBy": "saeed1907057",
   "shortDesc": "Inra",
   "approvedBy": "saeed1907057"
   }
   ],
   "totalPages": 1
   },
   "message": "Success"
   }

12

3.3 Read blog details

1. EndPoint:
   /api/v1/read_blog_details/{blogId}
2. Type: GET
3. Params:
   • blog id: Integer - ID of the blog to read.
4. Authority: Public
5. Sample request:
   /api/v1/read_blog_details/2222
6. Sample response:
   {
   "data": {
   "blog_id": 2222,
   "title": "23 feb",
   "short_desc": "There is nothing but light",
   "image": null,
   "last_updated": 1740342747943,
   "creation_time": 1740342747943,
   "written_by": "saeed1907057",
   "approved_by": "saeed1907057",
   "content": "This is my name how are you?"
   },
   "message": "Read successful",
   "success": true
   }

13

3.4 Filter blogs

1. EndPoint
   /api/v1/filter_by
2. Type: GET
3. Params
   • topic: Integer - topic ID
   • subtopic: Integer - sub topic ID (optional)
4. Authority: Public
5. Details
   (a) For filtering blogs based on topic and subtopic.
6. Sample request
   /api/v1/filter_by?topic=1&subtopic=1
7. Sample response
   {
   "data": [
   {
   "id": 1,
   "topic_id": 1,
   "sub_topic_id": 1,
   "title": "Introduction to C",
   "image": "https://localhost:8080/public/photos/blog_info_image_1.png",
   "author_image": "https://localhost:8080/public/photos/saeed1907057.png",
   "last_updated": 1731527123836,
   "creation_time": 1730637087426,
   "written_by": "Abu Saeed",
   "short_desc": "Introduction to C",
   "approved_by": "Abu Saeed"
   }
   ],
   "message": "Success",
   "success": true
   }

14

4 Event Controller
4.1 Save event

1. EndPoint
   /api/v1/save_event
2. Type: POST
3. Form data
   (a) info
   i. event name: String
   ii. short desc
   iii. date: String of format dd/MM/yyyy
   iv. venue: String
   v. full desc : String
   (b) title image: Image - Preview image of the blog
   (c) images: All images
   (d) captions: Text captions of those images
4. Authority: ADMIN

15

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

16

4.3 Update event

1. EndPoint
   /api/v1/update_event
2. Type: POST
3. Form data
   (a) info
   i. event name: String
   ii. short desc
   iii. date: String of format dd/MM/yyyy
   iv. venue: String
   v. full desc : String
   (b) title image: Image - Preview image of the blog
   (c) images: All images
   (d) captions: Text captions of those images
4. Authority: ADMIN
   4.4 Delete event
5. EndPoint
   /api/v1/delete_event
6. Type: POST
7. Params
   (a) event name: String
8. Authority: ADMIN

17

4.5 Read events

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

18

5 Fund Controller
5.1 Save fund

1. EndPoint
   /api/v1/save_fund
2. Type: POST
3. Json body
   (a) user name: String
   (b) amount: Integer
   (c) date: String - date or date time anything
4. Authority: ADMIN
5. Sample request
   {
   "user_name": "haque1907075",
   "amount": 1000,
   "date": "18/12/2020"
   }
6. Sample response
   {
   "data": {
   "id": 6,
   "fund_type": "DIRECT",
   "total_amount": 1000,
   "amount_for_club": 1000,
   "date_time": "18/12/2020",
   "given_by": "haque1907075",
   "done_by": null,
   "added_by": "saeed1907057"
   },
   "message": "Successfully saved",
   "success": true
   }

19

5.2 Read fund

1. EndPoint
   /api/v1/read_fund
2. Type: GET
3. Params
   (a) id: Integer
4. Authority: ADMIN, MENTOR
5. Sample request
   localhost:8080/api/v1/read_fund?id=6
6. Sample response
   {
   "data": {
   "id": 6,
   "fund_type": "DIRECT",
   "total_amount": 1000,
   "amount_for_club": 1000,
   "date_time": "18/12/2020",
   "given_by": "haque1907075",
   "done_by": null,
   "added_by": "saeed1907057"
   },
   "message": "Read successful",
   "success": true
   }
   5.3 Update fund
7. EndPoint
   /api/v1/update_fund
8. Type: POST
9. Body JSON
   (a) id: Integer
   (b) user name: String
   (c) amount: Integer
   (d) date: String
10. Authority: ADMIN
11. Sample JSON
    {
    "id":6,
    "user_name": "haque1907075",
    "amount": 1000,
    "date": "18/12/2020"
    }

20

5.4 Delete fund

1. EndPoint
   /api/v1/delete_fund
2. Type: POST
3. Params
   (a) id: Integer
4. Authority: ADMIN
5. Sample request
   localhost:8080/api/v1/delete_fund?id=6
6. Sample response
   {
   "data": {
   "id": 6,
   "fund_type": "DIRECT",
   "total_amount": 1000,
   "amount_for_club": 1000,
   "date_time": "18/12/2020",
   "given_by": "haque1907075",
   "done_by": null,
   "added_by": "saeed1907057"
   },
   "message": "Successfully deleted",
   "success": true
   }
   5.5 Save project fund & Update project fund
   Code base dekh FundController

21

6 Leader board
6.1 Read leaderboards

1. EndPoint
   /api/v1/read_leaderboards
2. Type: GET
3. Params
   (a) page: Integer - page number
   (b) item per page: Integer - number of items per page
4. Authority: Public
5. Sample response
   {
   "data": {
   "item_count": 0,
   "page_no": 0,
   "items": [],
   "total_pages": 0
   },
   "message": "Data read successful",
   "success": true
   }
   6.2 Read single leaderboard
6. EndPoint
   /api/v1/read_single_leaderboard
7. Type: GET
8. Params
   (a) user name: String
9. Authority: ADMIN
10. Sample request
    localhost:8080/api/v1/read_single_leaderboard?user_name=saeed1907057
11. Sample response
    {
    "data": {
    "user_name": "saeed1907057",
    "total_score": 0,
    "details": []
    },
    "message": "Data read successful",
    "success": true
    }

22

7 Link Controller
7.1 Save link

1. EndPoint
   /api/v1/save_link
2. Type: POST
3. Form data
   • title: String
   • url: String
4. Authority: ADMIN
5. Details
   (a) For saving a link like form link, drive link. User can later go to the link via website url.
6. Sample request
   {
   "title": "alumni-reg-link",
   "url": "https://www.google.com"
   }
7. Sample response
   {
   "data": {
   "title": "alumni-reg-link",
   "url": "https://www.google.com"
   },
   "message": "Link saved successfully",
   "success": true
   }

23

7.2 Update link

1. EndPoint
   /api/v1/update_link
2. Type: POST
3. Form data
   (a) title: String
   (b) url: String
4. Authority: ADMIN
5. Details
   (a) It updates link based on the title. Make sure title exists in database.
6. Sample request
   {
   "title": "alumni-reg-link",
   "url": "https://www.facebook.com"
   }
7. Sample response
   {
   "data": {
   "title": "alumni-reg-link",
   "url": "https://www.facebook.com"
   },
   "message": "Link updated successfully.",
   "success": true
   }

24

7.3 Delete link

1. EndPoint
   /api/v1/delete_link
2. Type: POST
3. Params
   (a) title: String
4. Authority: ADMIN
5. Sample request
   localhost:8080/api/v1/delete_link?title=alumni-reg-link
6. Sample response
   {
   "data": {
   "title": "alumni-reg-link",
   "url": "https://www.facebook.com"
   },
   "message": "Link deleted successfully.",
   "success": true
   }

25

7.4 Read link

1. EndPoint
   /api/v1/read_link
2. Type: GET
3. Params
   (a) title: String
4. Authority: Public
5. Sample request
   localhost:8080/api/v1/read_link?title=alumni-reg-link
6. Sample response
   {
   "data": {
   "title": "alumni-reg-link",
   "url": "https://www.facebook.com"
   },
   "message": "Link data retrieved successfully",
   "success": true
   }

26

8 Mail Controller
8.1 Request to contact

1. EndPoint
   /api/v1/request_to_contact
2. Type: POST
3. Form data
   (a) name: String
   (b) email: String
   (c) message: String - of length at least 20 chars.
4. Authority: Public
5. Details
   (a) A mail will be sent to the given mail.
   (b) A mail copy is also sent to our official club mail.
6. Sample request
   {
   "name": "Md Abu Saeed",
   "email": "abusaeed2433@gmail.com",
   "message": "When will the website be ready for all users?"
   }
7. Sample response
   {
   "data": "Thank you for contacting us. We will get back to you soon.",
   "message": "Success"
   }

27

8.2 Send bulk email

1. EndPoint
   /api/v1/send_email
2. Type: POST
3. Form data
   (a) file: File - A text file containing the email list, one in a line.
   (b) subject: String - Subject of the mail.
   (c) message: String - Body of the mail.
4. Authority: ADMIN
5. Details
   (a) For sending bulk email to a list of users.
6. Sample response
   {
   "data": "Total 3 emails sent successfully among 3 emails",
   "message": "Success"
   }

28

9 Photo Controller
9.1 Get instant photo

1. EndPoint
   /public/photos/instant/{fileName}
2. Type: GET
3. Params
   (a) fileName: String - name of the file
4. Authority: Pulic
5. Details
   (a) No need to use this api.
   (b) This is used to getting the image inside a blog.
   9.2 Get profile photo
6. EndPoint
   /public/photos/{fileName}
7. Type: GET
8. Params
   (a) fileName: String - Name
9. Authority: Public
10. Details
    (a) No need to call this api.
    (b) It will be used for fetching profile image.

29

10 Profile Controller
10.1 Read user info

1. EndPoint
   /api/v1/user_info/{email}
2. Type: GET
3. Params
   (a) email: String
4. Authority: Authenticated users only
5. Sample request
   localhost:8080/api/v1/user_info/saeed1907057@stud.kuet.ac.bd
6. Sample response
   {
   "data": {
   "name": "Abu Saeed",
   "email": "saeed1907057@stud.kuet.ac.bd",
   "username": "saeed1907057",
   "photo": "https://localhost:8080/public/photos/saeed1907057.png"
   },
   "message": "Success",
   "success": true
   }
   10.2 Update profile
7. EndPoint
   /api/v1/update_profile
8. Type: POST
9. Form data
   (a) info
   i. name: String - Full name
   ii. username: String
   iii. password
   (b) photo: Image file
10. Authority: Any authenticated users.
11. Details
    (a) It only updates name, password, and photo, using the username.

30

10.3 Delete user

1. EndPoint
   /api/v1/delete_user
2. Type: POST
3. Form data
   (a) username: String
4. Authority: ADMIN
5. Sample request
   {
   "username": "abusaeed2444"
   }
   10.4 Request verification mail
6. EndPoint
   /api/v1/request_verification_email
7. Type: POST
8. Form data
   (a) username: String
9. Authority: USER
10. Details
    (a) Remeber, by default, everyone is user, until admin change their role.
11. Sample request
    {
    "username": "abusaeed2444"
    }

31

10.5 Change role

1. EndPoint
   /api/v1/change_role
2. Type: POST
3. Body Json
   (a) user name: String
   (b) role: (ADMIN, MENTOR, TA, ALUMNI, USER)
4. Authority: ADMIN
5. Sample JSON
   {
   "user_name": "haque1907075",
   "role": "TA"
   }
6. Sample response
   {
   "data": {
   "user_name": "haque1907075",
   "email": "haque1907075@stud.kuet.ac.bd",
   "previous_role": "MENTOR",
   "new_role": "TA",
   "is_email_verified": true
   },
   "message": "Role changed successfully",
   "success": true
   }

32

11 Sub Topic Controller
11.1 Save sub topic

1. EndPoint:
   /api/v1/save_sub_topic
2. Type: POST
3. Form data
   (a) id: Integer - ID of the subtopic(int).
   (b) sub topic name: String - Name of the sub topic(String).
   (c) topic id: Integer - ID of the topic under which it belongs to.
   (d) serial: Integer - serial of the subtopic for ordering(int).
4. Sample request
   {
   "id":100,
   "topic_id": 999,
   "sub_topic_name": "24feb 06:08PM",
   "serial":20
   }
5. Sample response
   {
   "data": {
   "id": 100,
   "sub_topic_name": "24feb 06:08PM"
   },
   "message": "Successfully saved",
   "success": true
   }

33

11.2 Read sub topic

1. EndPoint
   /api/v1/read_sub_topic
2. Type: GET
3. Params
   (a) sub topic id: Integer - id of the sub topic
4. Authority: ADMIN, TA, MENTOR, USER
5. Sample request
   localhost:8080/api/v1/read_sub_topic?sub_topic_id=100
6. Sample response
   {
   "data": {
   "id": 100,
   "sub_topic_name": "24feb 06:08PM"
   },
   "message": "Read successful",
   "success": true
   }

34

11.3 Update sub topic

1. EndPoint
   /api/v1/update_sub_topic
2. Type: POST
3. Form data
   (a) id: Integer - ID of the subtopic(int).
   (b) sub topic name: String - Name of the sub topic(String).
   (c) topic id: Integer - ID of the topic under which it belongs to.
   (d) serial: Integer - serial of the subtopic for ordering(int).
4. Authority: ADMIN, MENTOR
5. Sample request
   {
   "id":100,
   "topic_id": 999,
   "sub_topic_name": "24feb 06:34PM",
   "serial":20
   }
6. Sample response
   {
   "data": {
   "id": 100,
   "sub_topic_name": "24feb 06:34PM"
   },
   "message": "Successfully updated",
   "success": true
   }
   11.4 Delete sub topic
7. EndPoint
   /api/v1/delete_sub_topic
8. Type: POST
9. Params
   (a) sub topic id: Integer
10. Authority: ADMIN, MENTOR

35

12 Topic Controller
12.1 Save topic

1. EndPoint:

/api/v1/save_topic

2. Type: POST
3. Form data:
   (a) id: Unique Integer id of the topic.
   (b) topic name: Name of the topic
   (c) no of sub topics: Integer
   (d) serial: For maintaining the topic order.
4. Authority: ADMIN
5. Sample request json
   {
   "id":100,
   "no_of_sub_topics": 10,
   "topic_name": "24feb 06:37sPM",
   "serial":21
   }
6. Response response
   {
   "data": {
   "id": 100,
   "topic_name": "24feb 06:37sPM",
   "no_of_sub_topics": 10,
   "serial": 21
   },
   "message": "Successfully added",
   "success": true
   }
   12.2 Read topic
7. EndPoint
   /api/v1/read_topic
8. Type: GET
9. Params
   (a) id: Integer
10. Authority: ADMIN, MENTOR, TA, USER

36

12.3 Update topic

1. EndPoint:

/api/v1/update_topic

2. Type: POST
3. Form data:
   (a) id: Unique Integer id of the topic.
   (b) topic name: Name of the topic
   (c) no of sub topics: Integer
   (d) serial: For maintaining the topic order.
4. Authority: ADMIN
5. Sample request json
   {
   "id":100,
   "no_of_sub_topics": 10,
   "topic_name": "24feb 06:37sPM",
   "serial":21
   }
6. Response response
   {
   "data": {
   "id": 100,
   "topic_name": "24feb 06:37sPM",
   "no_of_sub_topics": 10,
   "serial": 21
   },
   "message": "Successfully updated",
   "success": true
   }
   12.4 Delete topic
7. EndPoint
   /api/v1/delete_topic
8. Type: POST
9. Params
   (a) topic id: Integer
10. Authority: ADMIN
