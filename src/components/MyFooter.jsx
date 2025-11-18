const MyFooter = function () {
  return (
    <footer
      className="bg-dark text-white text-center py-3"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <p className="mb-0">© 2024 EpiBooks - All rights reserved</p>
    </footer>
  )
}

export default MyFooter
