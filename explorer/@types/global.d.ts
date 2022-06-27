declare module "*.svg" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- fix to avoid the 'cannot find module' when importing images
  const content: any;
  export default content;
}

declare module "*.png" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- fix to avoid the 'cannot find module' when importing images
  const content: any;
  export default content;
}

declare module "*.jpeg" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- fix to avoid the 'cannot find module' when importing images
  const content: any;
  export default content;
}
