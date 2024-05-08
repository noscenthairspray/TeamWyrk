//mock data for testing front end
export const conversations = [
    {
        id: 1,
        name: "Person A",
        messages: [
            {
                "id": 1,
                "content": "Hello",
                "timestamp": "2021-10-01T12:00:00Z"
            },
            {
                "id": 2,
                "content": "Hi",
                "timestamp": "2021-10-01T12:01:00Z"
            }
        ],
        lastMessageRead: true,
        relationship: "Product Manager Requester",
        image: "/images/landing_page/frank_avatar.png",
    },
    //test case for no messages (Request accepted, start a chat)
    {
        id: 2,
        name: "Dan Danerson",
        messages: [
            {
                "id": 1,
                "content": "Hello",
                "timestamp": "2021-10-01T12:00:00Z"
            },
            {
                "id": 2,
                "content": "Hi",
                "timestamp": "2021-10-01T12:01:00Z"
            }
        ],
        lastMessageRead: true,
        relationship: "SWE Requester",
        image: "/images/landing_page/arron_avatar.png",
    },
    {
        id: 3,
        name: "Sally Sallerson",
        messages: [
            {
                "id": 1,
                "content": "Hi Sally are you avaialble to chat?",
                "timestamp": "2023-10-01T12:00:00Z"
            },
            {
                "id": 2,
                "content": "Yes I am, here is a Zoom link: https://zoom.us/j/1234567890",
                "timestamp": "2023-10-01T12:01:00Z"
            }
        ],
        lastMessageRead: false,
        relationship: "Design Requester",
        image: "/images/landing_page/al_avatar.png",
    },
    //test case: for a draft message
    {
        id: 4,
        name: "Janet Janeterson",
        messages: [
            {
                "id": 1,
                "content": "Hi, are you avaialble to chat?",
                "timestamp": "2023-10-01T12:00:00Z"
            },
            {
                "id": 2,
                "content": "Yes I am, but not right now, in 10 minutes. here is a Zoom link: https://zoom.us/j/1234567890",
                "timestamp": "2023-10-01T12:01:00Z"
            }
        ],
        lastMessageRead: true,
        relationship: "Product Manager Requester",
        image: "/images/landing_page/frank_avatar.png",
    },
    {
        id: 4,
        name: "Erica Ericson",
        messages: [
            {
                "id": 1,
                "content": "Hi, are you avaialble to chat?",
                "timestamp": "2023-10-01T12:00:00Z"
            },
            {
                "id": 2,
                "content": "Hellooooo",
                "timestamp": "2024-02-01T12:01:00Z"
            }
        ],
        lastMessageRead: false,
        relationship: "SWE Requester",
        image: "/images/landing_page/arron_avatar.png",
    },
    //test case no messages
    {
        id: 5,
        name: "Ash Ketchem",
        messages: [
        ],
        lastMessageRead: true,
        relationship: "SWE Requester",
        image: "/images/landing_page/al_avatar.png",
    },


]