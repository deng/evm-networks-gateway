//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class NetworkExplorersInner {
  /// Returns a new [NetworkExplorersInner] instance.
  NetworkExplorersInner({
    this.name,
    this.url,
    this.standard,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? name;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? url;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? standard;

  @override
  bool operator ==(Object other) => identical(this, other) || other is NetworkExplorersInner &&
    other.name == name &&
    other.url == url &&
    other.standard == standard;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (name == null ? 0 : name!.hashCode) +
    (url == null ? 0 : url!.hashCode) +
    (standard == null ? 0 : standard!.hashCode);

  @override
  String toString() => 'NetworkExplorersInner[name=$name, url=$url, standard=$standard]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.name != null) {
      json[r'name'] = this.name;
    } else {
      json[r'name'] = null;
    }
    if (this.url != null) {
      json[r'url'] = this.url;
    } else {
      json[r'url'] = null;
    }
    if (this.standard != null) {
      json[r'standard'] = this.standard;
    } else {
      json[r'standard'] = null;
    }
    return json;
  }

  /// Returns a new [NetworkExplorersInner] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static NetworkExplorersInner? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "NetworkExplorersInner[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "NetworkExplorersInner[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return NetworkExplorersInner(
        name: mapValueOfType<String>(json, r'name'),
        url: mapValueOfType<String>(json, r'url'),
        standard: mapValueOfType<String>(json, r'standard'),
      );
    }
    return null;
  }

  static List<NetworkExplorersInner> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <NetworkExplorersInner>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = NetworkExplorersInner.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, NetworkExplorersInner> mapFromJson(dynamic json) {
    final map = <String, NetworkExplorersInner>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = NetworkExplorersInner.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of NetworkExplorersInner-objects as value to a dart map
  static Map<String, List<NetworkExplorersInner>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<NetworkExplorersInner>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = NetworkExplorersInner.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

