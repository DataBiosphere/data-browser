
let latestRelease = 11;

let releases = [
	[
		"november-10-2021",
		
		// New Raw Data, Metadata, and Contributor-generated Matrices (14)
		"https://data.humancellatlas.org/explore/projects/21ea8ddb-525f-4f1f-a820-31f0360399a2",
		"https://data.humancellatlas.org/explore/projects/8559a8ed-5d8c-4fb6-bde8-ab639cebf03c",
		"https://data.humancellatlas.org/explore/projects/783c9952-a4ae-4106-a6ce-56f20ce27f88",
		"https://data.humancellatlas.org/explore/projects/5eafb94b-02d8-423e-81b8-3673da319ca0",
		"https://data.humancellatlas.org/explore/projects/94023a08-611d-4f22-a8c9-90956e091b2e",
		"https://data.humancellatlas.org/explore/projects/8bd2e5f6-9453-4b9b-9c56-59e3a40dc87e",
		"https://data.humancellatlas.org/explore/projects/b32a9915-c81b-4cbc-af53-3a66b5da3c9a",
		"https://data.humancellatlas.org/explore/projects/75dbbce9-0cde-489c-88a7-93e8f92914a3",
		"https://data.humancellatlas.org/explore/projects/2b38025d-a5ea-4c0f-b22e-367824bcaf4c",
		"https://data.humancellatlas.org/explore/projects/ede2e0b4-6652-464f-abbc-0b2d964a25a0",
		"https://data.humancellatlas.org/explore/projects/d7b7beae-652b-4fc0-9bf2-bcda7c7115af",
		"https://data.humancellatlas.org/explore/projects/bd7104c9-a950-490e-9472-7d41c6b11c62",
		"https://data.humancellatlas.org/explore/projects/f6133d2a-9f3d-4ef9-9c19-c23d6c7e6cc0",
		"https://data.humancellatlas.org/explore/projects/31887183-a72c-4308-9eac-c6140313f39c",
		
	],
	[
		"october-13-2021",
		
		// New Raw Data, Metadata, and Contributor-generated Matrices (14)
		"https://data.humancellatlas.org/explore/projects/602628d7-c038-48a8-aa97-ffbb2cb44c9d",
		"https://data.humancellatlas.org/explore/projects/a9301beb-e9fa-42fe-b75c-84e8a460c733",
		"https://data.humancellatlas.org/explore/projects/7ac8822c-4ef0-4194-adf0-74290611b1c6",
		"https://data.humancellatlas.org/explore/projects/e0c74c7a-20a4-4505-9cf1-38dcdd23011b",
		"https://data.humancellatlas.org/explore/projects/8d566d35-d8d3-4975-a351-be5e25e9b2ea",
		"https://data.humancellatlas.org/explore/projects/20f37aaf-caa1-40e6-9123-be6ce8feb2d6",
		"https://data.humancellatlas.org/explore/projects/a80a63f2-e223-4890-81b0-415855b89abc",
		"https://data.humancellatlas.org/explore/projects/65858543-530d-48a6-a670-f972b34dfe10",
		"https://data.humancellatlas.org/explore/projects/9bab0f03-a725-4a13-9ab1-196e46cd80ed",
		"https://data.humancellatlas.org/explore/projects/074a9f88-729a-455d-bca5-0ce80edf0cea",
		"https://data.humancellatlas.org/explore/projects/504e0cee-1688-40fa-b936-361c4a831f87",
		"https://data.humancellatlas.org/explore/projects/ef1d9888-fa86-47a4-bb72-0ab0f20f7004",
		"https://data.humancellatlas.org/explore/projects/50151324-f3ed-4358-98af-ec352a940a61",
		"https://data.humancellatlas.org/explore/projects/3c27d2dd-b180-4b2b-bf05-e2e418393fd1",
		
	],
	[
		"september-17-2021",
		
		// New Raw Data
		"https://data.humancellatlas.org/explore/projects/d7845650-f6b1-4b1c-b2fe-c0795416ba7b",
		"https://data.humancellatlas.org/explore/projects/da2747fa-2921-42e0-afd4-39ef57b2b88b",
		"https://data.humancellatlas.org/explore/projects/79b13a2a-9ca1-42a4-97bd-70208a11bea6",
		"https://data.humancellatlas.org/explore/projects/b7259878-436c-4274-bfff-ca76f4cb7892",
		"https://data.humancellatlas.org/explore/projects/56e73ccb-7ae9-4fae-a738-acfb69936d7a",
		"https://data.humancellatlas.org/explore/projects/8dacb243-e918-4bd2-bb9a-aac6dc424161",
		"https://data.humancellatlas.org/explore/projects/e57dc176-ab98-446b-90c2-89e0842152fd",
		"https://data.humancellatlas.org/explore/projects/34cba5e9-ecb1-4d81-bf08-48987cd63073",
		"https://data.humancellatlas.org/explore/projects/8999b456-6fa6-438b-ab17-b62b1d8ec0c3",
		"https://data.humancellatlas.org/explore/projects/dd7f2436-0c56-4709-bd17-e526bba4cc15",
		"https://data.humancellatlas.org/explore/projects/7c75f07c-608d-4c4a-a1b7-b13d11c0ad31",
		"https://data.humancellatlas.org/explore/projects/4af795f7-3e1d-4341-b867-4ac0982b9efd",
		"https://data.humancellatlas.org/explore/projects/ad04c8e7-9b7d-4cce-b8e9-01e31da10b94",
		"https://data.humancellatlas.org/explore/projects/b9484e4e-dc40-4e38-9b85-4cecf5b8c068",
		
	],
	[
		"august-25-2021",
		
		// New Raw Data
		"https://data.humancellatlas.org/explore/projects/f0f89c14-7460-4bab-9d42-22228a91f185",
		"https://data.humancellatlas.org/explore/projects/8787c238-89ef-4636-a57d-3167e8b54a80",
		"https://data.humancellatlas.org/explore/projects/c5f46615-68de-4cf4-bbc2-a0ae10f08243",
		"https://data.humancellatlas.org/explore/projects/c715cd2f-dc7c-44a6-9cd5-b6a6d9f075ae",
		"https://data.humancellatlas.org/explore/projects/dbcd4b1d-31bd-4eb5-94e1-50e8706fa192",
		"https://data.humancellatlas.org/explore/projects/414acced-eba0-440f-b721-befbc5642bef",
		"https://data.humancellatlas.org/explore/projects/376a7f55-b876-4f60-9cf3-ed7bc83d5415",
		"https://data.humancellatlas.org/explore/projects/71eb5f6d-cee0-4297-b503-b1125909b8c7",
		"https://data.humancellatlas.org/explore/projects/e77fed30-959d-4fad-bc15-a0a5a85c21d2",
		"https://data.humancellatlas.org/explore/projects/403c3e76-6814-4a2d-a580-5dd5de38c7ff",
		"https://data.humancellatlas.org/explore/projects/3cfcdff5-dee1-4a7b-a591-c09c6e850b11",
		"https://data.humancellatlas.org/explore/projects/e526d91d-cf3a-44cb-80c5-fd7676b55a1d",
		
		// New Contributor Data
		"https://data.humancellatlas.org/explore/projects/d3ac7c1b-5302-4804-b611-dad9f89c049d",
		"https://data.humancellatlas.org/explore/projects/51f02950-ee25-4f4b-8d07-59aa99bb3498",
		
	],
	[
		"july-23-2021",
		
		// Projects with new raw data and/or contributor-generated matrices:
		"https://data.humancellatlas.org/explore/projects/dbd836cf-bfc2-41f0-9834-41cc6c0b235a",
		"https://data.humancellatlas.org/explore/projects/379ed69e-be05-48bc-af5e-a7fc589709bf",
		"https://data.humancellatlas.org/explore/projects/faeedcb0-e046-4be7-b1ad-80a3eeabb066",
		"https://data.humancellatlas.org/explore/projects/71436067-ac41-4ace-be1b-2fbcc2cb02fa",
		"https://data.humancellatlas.org/explore/projects/8a40ff19-e614-4c50-b23b-5c9e1d546bab",
		"https://data.humancellatlas.org/explore/projects/3e329187-a9c4-48ec-90e3-cc45f7c2311c",
		"https://data.humancellatlas.org/explore/projects/7880637a-35a1-4047-b422-b5eac2a2a358",
		"https://data.humancellatlas.org/explore/projects/d3446f0c-30f3-4a12-b7c3-6af877c7bb2d",
		"https://data.humancellatlas.org/explore/projects/7b947aa2-43a7-4082-afff-222a3e3a4635",
		"https://data.humancellatlas.org/explore/projects/2ef3655a-973d-4d69-9b41-21fa4041eed7",
		"https://data.humancellatlas.org/explore/projects/d012d476-8f8c-4ff3-89d6-ebbe22c1b5c1",
		"https://data.humancellatlas.org/explore/projects/78b2406d-bff2-46fc-8b61-20690e602227",
		"https://data.humancellatlas.org/explore/projects/67a3de09-45b9-49c3-a068-ff4665daa50e",
		"https://data.humancellatlas.org/explore/projects/df88f39f-01a8-4b5b-92f4-3177d6c0f242",
		"https://data.humancellatlas.org/explore/projects/51f02950-ee25-4f4b-8d07-59aa99bb3498",
		
	],
];