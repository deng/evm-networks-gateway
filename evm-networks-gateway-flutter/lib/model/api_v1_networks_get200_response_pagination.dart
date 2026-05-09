//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class ApiV1NetworksGet200ResponsePagination {
  /// Returns a new [ApiV1NetworksGet200ResponsePagination] instance.
  ApiV1NetworksGet200ResponsePagination({
    this.page,
    this.limit,
    this.total,
    this.totalPages,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? page;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? limit;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? total;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? totalPages;

  @override
  bool operator ==(Object other) => identical(this, other) || other is ApiV1NetworksGet200ResponsePagination &&
    other.page == page &&
    other.limit == limit &&
    other.total == total &&
    other.totalPages == totalPages;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (page == null ? 0 : page!.hashCode) +
    (limit == null ? 0 : limit!.hashCode) +
    (total == null ? 0 : total!.hashCode) +
    (totalPages == null ? 0 : totalPages!.hashCode);

  @override
  String toString() => 'ApiV1NetworksGet200ResponsePagination[page=$page, limit=$limit, total=$total, totalPages=$totalPages]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.page != null) {
      json[r'page'] = this.page;
    } else {
      json[r'page'] = null;
    }
    if (this.limit != null) {
      json[r'limit'] = this.limit;
    } else {
      json[r'limit'] = null;
    }
    if (this.total != null) {
      json[r'total'] = this.total;
    } else {
      json[r'total'] = null;
    }
    if (this.totalPages != null) {
      json[r'totalPages'] = this.totalPages;
    } else {
      json[r'totalPages'] = null;
    }
    return json;
  }

  /// Returns a new [ApiV1NetworksGet200ResponsePagination] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static ApiV1NetworksGet200ResponsePagination? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "ApiV1NetworksGet200ResponsePagination[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "ApiV1NetworksGet200ResponsePagination[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return ApiV1NetworksGet200ResponsePagination(
        page: mapValueOfType<int>(json, r'page'),
        limit: mapValueOfType<int>(json, r'limit'),
        total: mapValueOfType<int>(json, r'total'),
        totalPages: mapValueOfType<int>(json, r'totalPages'),
      );
    }
    return null;
  }

  static List<ApiV1NetworksGet200ResponsePagination> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <ApiV1NetworksGet200ResponsePagination>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = ApiV1NetworksGet200ResponsePagination.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, ApiV1NetworksGet200ResponsePagination> mapFromJson(dynamic json) {
    final map = <String, ApiV1NetworksGet200ResponsePagination>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = ApiV1NetworksGet200ResponsePagination.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of ApiV1NetworksGet200ResponsePagination-objects as value to a dart map
  static Map<String, List<ApiV1NetworksGet200ResponsePagination>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<ApiV1NetworksGet200ResponsePagination>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = ApiV1NetworksGet200ResponsePagination.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

