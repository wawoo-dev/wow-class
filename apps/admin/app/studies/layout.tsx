import { css } from "@styled-system/css";
import Navbar from "components/Navbar";

const StudiesLayout = ({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <main className={studiesLayoutStyle}>
        {children}
        {modal}
      </main>
    </>
  );
};

export default StudiesLayout;

const studiesLayoutStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "sm",
  height: "100vh",
  overflow: "scroll",
  width: "100%",
  padding: "54px 101px",
});
