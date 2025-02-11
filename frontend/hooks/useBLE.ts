/* eslint-disable no-bitwise */
import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";

import * as ExpoDevice from "expo-device";
import base64 from "react-native-base64";

const SERVICE_UUID = "12345678-1234-5678-1234-56789abcdef0"; // UUID do serviço no ESP32
const CHARACTERISTIC_UUID = "abcdef01-1234-5678-1234-56789abcdef0"; // UUID da característica no ESP32

interface BluetoothLowEnergyApi {
  requestPermissions(): Promise<boolean>;
  scanForPeripherals(): void;
  connectToDevice: (device: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  uvIndex: number;
}

function useBLE(): BluetoothLowEnergyApi {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [uvIndex, setUvIndex] = useState<number>(0);

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const bluetoothScanPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
        );
        const bluetoothConnectPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
        );
        const fineLocationPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        return (
          bluetoothScanPermission === "granted" &&
          bluetoothConnectPermission === "granted" &&
          fineLocationPermission === "granted"
        );
      }
    }
    return true;
  };

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.some((device) => nextDevice.id === device.id);

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error("Scan Error:", error);
        return;
      }
      if (device && device.name?.includes("ESP32_UV_Sensor")) {
        setAllDevices((prevDevices) => {
          if (!isDuplicateDevice(prevDevices, device)) {
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      }
    });

  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      startStreamingData(deviceConnection);
    } catch (e) {
      console.error("Connection Failed", e);
    }
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setUvIndex(0);
    }
  };

  const onUVIndexUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null
  ) => {
    if (error) {
      console.error("BLE Error:", error);
      return;
    }
    if (!characteristic?.value) {
      console.log("No Data Received");
      return;
    }

    const rawData = base64.decode(characteristic.value);
    const uvValue = parseInt(rawData, 10); // Converte o dado recebido para número

    console.log("UV Index Received:", uvValue);
    setUvIndex(uvValue);
  };

  const startStreamingData = async (device: Device) => {
    if (device) {
      device.monitorCharacteristicForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        onUVIndexUpdate
      );
    } else {
      console.log("No Device Connected");
    }
  };

  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    uvIndex,
  };
}

export default useBLE;