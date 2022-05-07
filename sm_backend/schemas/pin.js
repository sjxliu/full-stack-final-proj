export default {
  name: "pin",
  title: "Pin",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "about",
      title: "About",
      type: "string",
    },
    {
      name: "destination",
      title: "Destination",
      type: "url",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
        //makes it possible to responsively adapt the imgs to diff. aspects ratios @ display time
      },
    },
    {
      name: "userId",
      title: "UserID",
      type: "string",
    },
    {
      name: "postedBy",
      title: "PostBy",
      type: "postedBy",
    },
    {
      name: "saved",
      title: "Saved",
      type: "array",
      of: [
        {
          type: "save",
        },
      ],
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [
        {
          type: "comment",
        },
      ],
    },
  ],
};
