# evm_networks_gateway.api.NetworksApi

## Load the API package
```dart
import 'package:evm_networks_gateway/api.dart';
```

All URIs are relative to *https://evm-networks.bithub.pro*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1NetworksChainIdGet**](NetworksApi.md#apiv1networkschainidget) | **GET** /api/v1/networks/{chainId} | Get network by chain ID
[**apiV1NetworksGet**](NetworksApi.md#apiv1networksget) | **GET** /api/v1/networks | List all networks


# **apiV1NetworksChainIdGet**
> ApiV1NetworksChainIdGet200Response apiV1NetworksChainIdGet(chainId)

Get network by chain ID

Returns detailed information for a single EVM network.

### Example
```dart
import 'package:evm_networks_gateway/api.dart';

final api_instance = NetworksApi();
final chainId = 1; // int | Chain ID (EIP-155)

try {
    final result = api_instance.apiV1NetworksChainIdGet(chainId);
    print(result);
} catch (e) {
    print('Exception when calling NetworksApi->apiV1NetworksChainIdGet: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chainId** | **int**| Chain ID (EIP-155) | 

### Return type

[**ApiV1NetworksChainIdGet200Response**](ApiV1NetworksChainIdGet200Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1NetworksGet**
> ApiV1NetworksGet200Response apiV1NetworksGet(search, chainId, page, limit)

List all networks

Returns all EVM networks with optional search/filter.

### Example
```dart
import 'package:evm_networks_gateway/api.dart';

final api_instance = NetworksApi();
final search = arbitrum; // String | Search by chain name, short name, or chain symbol
final chainId = 1; // int | Filter by exact chain ID
final page = 1; // int | Page number (default 1)
final limit = 20; // int | Items per page (default 50, max 200, set 0 for all)

try {
    final result = api_instance.apiV1NetworksGet(search, chainId, page, limit);
    print(result);
} catch (e) {
    print('Exception when calling NetworksApi->apiV1NetworksGet: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **search** | **String**| Search by chain name, short name, or chain symbol | [optional] 
 **chainId** | **int**| Filter by exact chain ID | [optional] 
 **page** | **int**| Page number (default 1) | [optional] [default to 1]
 **limit** | **int**| Items per page (default 50, max 200, set 0 for all) | [optional] [default to 50]

### Return type

[**ApiV1NetworksGet200Response**](ApiV1NetworksGet200Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

