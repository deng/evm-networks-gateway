# evm_networks_gateway.model.Network

## Load the model package
```dart
import 'package:evm_networks_gateway/api.dart';
```

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**chainId** | **int** |  | [optional] 
**name** | **String** |  | [optional] 
**chain** | **String** |  | [optional] 
**shortName** | **String** |  | [optional] 
**rpc** | **List<String>** |  | [optional] [default to const []]
**nativeCurrency** | [**NetworkNativeCurrency**](NetworkNativeCurrency.md) |  | [optional] 
**explorers** | [**List<NetworkExplorersInner>**](NetworkExplorersInner.md) |  | [optional] [default to const []]
**infoURL** | **String** |  | [optional] 
**faucets** | **List<String>** |  | [optional] [default to const []]
**icon** | **String** |  | [optional] 
**isTestnet** | **bool** |  | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


