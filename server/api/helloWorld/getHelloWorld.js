export const getHelloWorld = async (req, res) => {
  try {
    return res.json({
      hello: "Hello!!!",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ error: error?.message, success: false });
  }
};
