type LayoutProps = {
  children: any;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <main className="my-10 mx-0 md:mx-6 lg:mx-16">{children}</main>;
};

export default Layout;
