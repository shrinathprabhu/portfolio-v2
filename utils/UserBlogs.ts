export const UserBlogs = [
  {
    id: "1",
    title: "Vue 3 Composition API: Basics and Patterns",
    external: true,
    link: "https://medium.com/arcana-network-blog/vue-3-composition-api-basics-and-patterns-44813f2c785d",
    media: [
      {
        src: "/images/blogs/1.avif",
        type: "image",
        styles: { background: "#111111" },
      },
    ],
  },
] as {
  id: string;
  title: string;
  external: boolean;
  link?: string;
  media: [
    {
      src: string;
      type: "image" | "video";
      styles?: { background?: string };
    }
  ];
}[];
