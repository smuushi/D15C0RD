{
	entities: {
		users: {
            1: {
                id: 1, 
                username: "papaya",
                tag: 1234, 
                email: "holymoly@gmail.com"

            },
            2: {
                id: 2, 
                username: "$47hi-liter"
                tag: 1891,
                email: "timwhatsup@gmail.com"
            },
            3: {
                id: 3,
                username: "IHaveNoroVirus",
                tag: 8104,
                email: "jupiter@who.com"
            }
        },
		servers: {
            1: {
                id: 1,
                name: "community",
                owner_id: 2,
                subscribers: [
                    1, 2, 3
                ]
            },
            2: {
                id: 2,
                name: "StepppingOnLegos"
                owner_id: 3,
                subscribers: [
                    1, 3
                ]
            }
        },
        privateConvos: {
            1: {
                id: 1, 
                users: [
                    1, 2
                ]
            },
            2: {
                id: 2,
                users: [
                    1, 3
                ]
            }
        },
        messages: {
            1: {
                id: 1, 
                author_id: 3, 
                content: "i'm so sick and i stepped on a lego lmao"
                context_id: 2
            },
            2: {
                id: 2,
                author_id: 2, 
                content: "rip"
                context_id: 2
            }
            3: {
                id: 3,
                author_id: 3, 
                content: "im so sad"
                context_id: 2
            }
        },
        privateMessages: {
            1: {
                id: 1,
                author_id: 3,
                content: "am I talking too muich?"
                convo_id: 2
            }, 
            2: {
                id: 2, 
                author_id: 1, 
                content: "I hate people who make typos"
                convo_id: 2
            }
        }
        serverSubscriptions: {
            1: {
                id: 1, 
                subscriber_id: 3, 
                server_id: 1, 
            }, 
            2: {
                id: 2, 
                subscriber_id: 1, 
                server_id: 2
            }
        }
	},
	session: {
		loggedInId: 1
	},
	ui: {
		modalOpen: true
	},
	errors: {
		userErrors: [],
		sessionErrors: [],
	}
}