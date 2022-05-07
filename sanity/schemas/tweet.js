export default {
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text in Tweet',
      type: 'string',
    },
    {
      name: 'blockTweet',
      title: 'Block Tweet',
      type: 'boolean',
      description: "ADMIN controls: Toggle if Tweet is deemed inappropriate",
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: "profileImg",
      title: "Profiel Image",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "string",
    }
  ],
}
