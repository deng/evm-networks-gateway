//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;


class NetworksApi {
  NetworksApi([ApiClient? apiClient]) : apiClient = apiClient ?? defaultApiClient;

  final ApiClient apiClient;

  /// Get network by chain ID
  ///
  /// Returns detailed information for a single EVM network.
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [int] chainId (required):
  ///   Chain ID (EIP-155)
  Future<Response> apiV1NetworksChainIdGetWithHttpInfo(int chainId,) async {
    // ignore: prefer_const_declarations
    final path = r'/api/v1/networks/{chainId}'
      .replaceAll('{chainId}', chainId.toString());

    // ignore: prefer_final_locals
    Object? postBody;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

    const contentTypes = <String>[];


    return apiClient.invokeAPI(
      path,
      'GET',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// Get network by chain ID
  ///
  /// Returns detailed information for a single EVM network.
  ///
  /// Parameters:
  ///
  /// * [int] chainId (required):
  ///   Chain ID (EIP-155)
  Future<ApiV1NetworksChainIdGet200Response?> apiV1NetworksChainIdGet(int chainId,) async {
    final response = await apiV1NetworksChainIdGetWithHttpInfo(chainId,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'ApiV1NetworksChainIdGet200Response',) as ApiV1NetworksChainIdGet200Response;
    
    }
    return null;
  }

  /// List all networks
  ///
  /// Returns all EVM networks with optional search/filter.
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] search:
  ///   Search by chain name, short name, or chain symbol
  ///
  /// * [int] chainId:
  ///   Filter by exact chain ID
  ///
  /// * [int] page:
  ///   Page number (default 1)
  ///
  /// * [int] limit:
  ///   Items per page (default 50, max 200, set 0 for all)
  Future<Response> apiV1NetworksGetWithHttpInfo({ String? search, int? chainId, int? page, int? limit, }) async {
    // ignore: prefer_const_declarations
    final path = r'/api/v1/networks';

    // ignore: prefer_final_locals
    Object? postBody;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

    if (search != null) {
      queryParams.addAll(_queryParams('', 'search', search));
    }
    if (chainId != null) {
      queryParams.addAll(_queryParams('', 'chainId', chainId));
    }
    if (page != null) {
      queryParams.addAll(_queryParams('', 'page', page));
    }
    if (limit != null) {
      queryParams.addAll(_queryParams('', 'limit', limit));
    }

    const contentTypes = <String>[];


    return apiClient.invokeAPI(
      path,
      'GET',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// List all networks
  ///
  /// Returns all EVM networks with optional search/filter.
  ///
  /// Parameters:
  ///
  /// * [String] search:
  ///   Search by chain name, short name, or chain symbol
  ///
  /// * [int] chainId:
  ///   Filter by exact chain ID
  ///
  /// * [int] page:
  ///   Page number (default 1)
  ///
  /// * [int] limit:
  ///   Items per page (default 50, max 200, set 0 for all)
  Future<ApiV1NetworksGet200Response?> apiV1NetworksGet({ String? search, int? chainId, int? page, int? limit, }) async {
    final response = await apiV1NetworksGetWithHttpInfo( search: search, chainId: chainId, page: page, limit: limit, );
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'ApiV1NetworksGet200Response',) as ApiV1NetworksGet200Response;
    
    }
    return null;
  }
}
