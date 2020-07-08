jest.mock(`expo-device`, () => ({
  isDevice: true,
}))

describe(`DeviceManager`, () => {
  beforeEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
    jest.resetModules()
  })

  it(`returns if real device`, async () => {
    const DeviceManager = (await import(`../DeviceManager`)).default
    expect(DeviceManager.isRealDevice()).toBe(true)
  })

  it(`fails early if airplane mode is enabled`, async () => {
    jest.doMock(`expo-network`, () => ({
      __esModule: true,
      getNetworkStateAsync: jest.fn(
        () => Promise.resolve({ isInternetReachable: false }),
      ),
      isAirplaneModeEnabledAsync: jest.fn(() => Promise.resolve(true)),
    }))

    const DeviceManager = (await import(`../DeviceManager`)).default

    const isConnected = await DeviceManager.isConnectedToInternet()
    expect(isConnected).toBe(false)
  })

  it(`checks if connected to internet`, async () => {
    jest.doMock(`expo-network`, () => ({
      __esModule: true,
      getNetworkStateAsync: jest.fn(
        () => Promise.resolve({ isInternetReachable: true }),
      ),
      isAirplaneModeEnabledAsync: jest.fn(() => Promise.resolve(false)),
    }))

    const DeviceManager = (await import(`../DeviceManager`)).default

    const isConnected = await DeviceManager.isConnectedToInternet()
    expect(isConnected).toBe(true)
  })
})
