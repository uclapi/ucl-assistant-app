const Shadow = elevation => ({
  shadowOpacity: 0.0015 * elevation + 0.18,
  shadowRadius: 0.54 * elevation,
  shadowOffset: {
    height: 0.6 * elevation,
  },
  shadowColor: "#000",
  elevation,
});

export default Shadow;
