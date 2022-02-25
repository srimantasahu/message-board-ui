export function getMessages() {
  return fetch('http://localhost:9090/messageboard/messages/getAll')
            .then(data => data.json());
}

export function addMessage(message) {
 return fetch('http://localhost:9090/messageboard/messages/add', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(message)
 }).then(data => data.json());
}