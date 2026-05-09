//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class Network {
  /// Returns a new [Network] instance.
  Network({
    this.chainId,
    this.name,
    this.chain,
    this.shortName,
    this.rpc = const [],
    this.nativeCurrency,
    this.explorers = const [],
    this.infoURL,
    this.faucets = const [],
    this.icon,
    this.isTestnet,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? chainId;

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
  String? chain;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? shortName;

  List<String> rpc;

  NetworkNativeCurrency? nativeCurrency;

  List<NetworkExplorersInner> explorers;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? infoURL;

  List<String> faucets;

  String? icon;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  bool? isTestnet;

  @override
  bool operator ==(Object other) => identical(this, other) || other is Network &&
    other.chainId == chainId &&
    other.name == name &&
    other.chain == chain &&
    other.shortName == shortName &&
    _deepEquality.equals(other.rpc, rpc) &&
    other.nativeCurrency == nativeCurrency &&
    _deepEquality.equals(other.explorers, explorers) &&
    other.infoURL == infoURL &&
    _deepEquality.equals(other.faucets, faucets) &&
    other.icon == icon &&
    other.isTestnet == isTestnet;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (chainId == null ? 0 : chainId!.hashCode) +
    (name == null ? 0 : name!.hashCode) +
    (chain == null ? 0 : chain!.hashCode) +
    (shortName == null ? 0 : shortName!.hashCode) +
    (rpc.hashCode) +
    (nativeCurrency == null ? 0 : nativeCurrency!.hashCode) +
    (explorers.hashCode) +
    (infoURL == null ? 0 : infoURL!.hashCode) +
    (faucets.hashCode) +
    (icon == null ? 0 : icon!.hashCode) +
    (isTestnet == null ? 0 : isTestnet!.hashCode);

  @override
  String toString() => 'Network[chainId=$chainId, name=$name, chain=$chain, shortName=$shortName, rpc=$rpc, nativeCurrency=$nativeCurrency, explorers=$explorers, infoURL=$infoURL, faucets=$faucets, icon=$icon, isTestnet=$isTestnet]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.chainId != null) {
      json[r'chainId'] = this.chainId;
    } else {
      json[r'chainId'] = null;
    }
    if (this.name != null) {
      json[r'name'] = this.name;
    } else {
      json[r'name'] = null;
    }
    if (this.chain != null) {
      json[r'chain'] = this.chain;
    } else {
      json[r'chain'] = null;
    }
    if (this.shortName != null) {
      json[r'shortName'] = this.shortName;
    } else {
      json[r'shortName'] = null;
    }
      json[r'rpc'] = this.rpc;
    if (this.nativeCurrency != null) {
      json[r'nativeCurrency'] = this.nativeCurrency;
    } else {
      json[r'nativeCurrency'] = null;
    }
      json[r'explorers'] = this.explorers;
    if (this.infoURL != null) {
      json[r'infoURL'] = this.infoURL;
    } else {
      json[r'infoURL'] = null;
    }
      json[r'faucets'] = this.faucets;
    if (this.icon != null) {
      json[r'icon'] = this.icon;
    } else {
      json[r'icon'] = null;
    }
    if (this.isTestnet != null) {
      json[r'isTestnet'] = this.isTestnet;
    } else {
      json[r'isTestnet'] = null;
    }
    return json;
  }

  /// Returns a new [Network] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static Network? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "Network[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "Network[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return Network(
        chainId: mapValueOfType<int>(json, r'chainId'),
        name: mapValueOfType<String>(json, r'name'),
        chain: mapValueOfType<String>(json, r'chain'),
        shortName: mapValueOfType<String>(json, r'shortName'),
        rpc: json[r'rpc'] is Iterable
            ? (json[r'rpc'] as Iterable).cast<String>().toList(growable: false)
            : const [],
        nativeCurrency: NetworkNativeCurrency.fromJson(json[r'nativeCurrency']),
        explorers: NetworkExplorersInner.listFromJson(json[r'explorers']),
        infoURL: mapValueOfType<String>(json, r'infoURL'),
        faucets: json[r'faucets'] is Iterable
            ? (json[r'faucets'] as Iterable).cast<String>().toList(growable: false)
            : const [],
        icon: mapValueOfType<String>(json, r'icon'),
        isTestnet: mapValueOfType<bool>(json, r'isTestnet'),
      );
    }
    return null;
  }

  static List<Network> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <Network>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = Network.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, Network> mapFromJson(dynamic json) {
    final map = <String, Network>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = Network.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of Network-objects as value to a dart map
  static Map<String, List<Network>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<Network>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = Network.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

