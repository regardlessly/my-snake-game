// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'app_database.dart';

// ignore_for_file: type=lint
class $StepHourlyRawTable extends StepHourlyRaw
    with TableInfo<$StepHourlyRawTable, StepHourlyRawData> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $StepHourlyRawTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _memberIdMeta = const VerificationMeta(
    'memberId',
  );
  @override
  late final GeneratedColumn<String> memberId = GeneratedColumn<String>(
    'member_id',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _dateMeta = const VerificationMeta('date');
  @override
  late final GeneratedColumn<String> date = GeneratedColumn<String>(
    'date',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _hourMeta = const VerificationMeta('hour');
  @override
  late final GeneratedColumn<int> hour = GeneratedColumn<int>(
    'hour',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _stepCountMeta = const VerificationMeta(
    'stepCount',
  );
  @override
  late final GeneratedColumn<int> stepCount = GeneratedColumn<int>(
    'step_count',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _sourceMeta = const VerificationMeta('source');
  @override
  late final GeneratedColumn<String> source = GeneratedColumn<String>(
    'source',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _capturedAtMeta = const VerificationMeta(
    'capturedAt',
  );
  @override
  late final GeneratedColumn<DateTime> capturedAt = GeneratedColumn<DateTime>(
    'captured_at',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _syncedMeta = const VerificationMeta('synced');
  @override
  late final GeneratedColumn<bool> synced = GeneratedColumn<bool>(
    'synced',
    aliasedName,
    false,
    type: DriftSqlType.bool,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'CHECK ("synced" IN (0, 1))',
    ),
    defaultValue: const Constant(false),
  );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    memberId,
    date,
    hour,
    stepCount,
    source,
    capturedAt,
    synced,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'step_hourly_raw';
  @override
  VerificationContext validateIntegrity(
    Insertable<StepHourlyRawData> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('member_id')) {
      context.handle(
        _memberIdMeta,
        memberId.isAcceptableOrUnknown(data['member_id']!, _memberIdMeta),
      );
    } else if (isInserting) {
      context.missing(_memberIdMeta);
    }
    if (data.containsKey('date')) {
      context.handle(
        _dateMeta,
        date.isAcceptableOrUnknown(data['date']!, _dateMeta),
      );
    } else if (isInserting) {
      context.missing(_dateMeta);
    }
    if (data.containsKey('hour')) {
      context.handle(
        _hourMeta,
        hour.isAcceptableOrUnknown(data['hour']!, _hourMeta),
      );
    } else if (isInserting) {
      context.missing(_hourMeta);
    }
    if (data.containsKey('step_count')) {
      context.handle(
        _stepCountMeta,
        stepCount.isAcceptableOrUnknown(data['step_count']!, _stepCountMeta),
      );
    } else if (isInserting) {
      context.missing(_stepCountMeta);
    }
    if (data.containsKey('source')) {
      context.handle(
        _sourceMeta,
        source.isAcceptableOrUnknown(data['source']!, _sourceMeta),
      );
    } else if (isInserting) {
      context.missing(_sourceMeta);
    }
    if (data.containsKey('captured_at')) {
      context.handle(
        _capturedAtMeta,
        capturedAt.isAcceptableOrUnknown(data['captured_at']!, _capturedAtMeta),
      );
    } else if (isInserting) {
      context.missing(_capturedAtMeta);
    }
    if (data.containsKey('synced')) {
      context.handle(
        _syncedMeta,
        synced.isAcceptableOrUnknown(data['synced']!, _syncedMeta),
      );
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  StepHourlyRawData map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return StepHourlyRawData(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      memberId: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}member_id'],
      )!,
      date: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}date'],
      )!,
      hour: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}hour'],
      )!,
      stepCount: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}step_count'],
      )!,
      source: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}source'],
      )!,
      capturedAt: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}captured_at'],
      )!,
      synced: attachedDatabase.typeMapping.read(
        DriftSqlType.bool,
        data['${effectivePrefix}synced'],
      )!,
    );
  }

  @override
  $StepHourlyRawTable createAlias(String alias) {
    return $StepHourlyRawTable(attachedDatabase, alias);
  }
}

class StepHourlyRawData extends DataClass
    implements Insertable<StepHourlyRawData> {
  final int id;
  final String memberId;
  final String date;
  final int hour;
  final int stepCount;
  final String source;
  final DateTime capturedAt;
  final bool synced;
  const StepHourlyRawData({
    required this.id,
    required this.memberId,
    required this.date,
    required this.hour,
    required this.stepCount,
    required this.source,
    required this.capturedAt,
    required this.synced,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['member_id'] = Variable<String>(memberId);
    map['date'] = Variable<String>(date);
    map['hour'] = Variable<int>(hour);
    map['step_count'] = Variable<int>(stepCount);
    map['source'] = Variable<String>(source);
    map['captured_at'] = Variable<DateTime>(capturedAt);
    map['synced'] = Variable<bool>(synced);
    return map;
  }

  StepHourlyRawCompanion toCompanion(bool nullToAbsent) {
    return StepHourlyRawCompanion(
      id: Value(id),
      memberId: Value(memberId),
      date: Value(date),
      hour: Value(hour),
      stepCount: Value(stepCount),
      source: Value(source),
      capturedAt: Value(capturedAt),
      synced: Value(synced),
    );
  }

  factory StepHourlyRawData.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return StepHourlyRawData(
      id: serializer.fromJson<int>(json['id']),
      memberId: serializer.fromJson<String>(json['memberId']),
      date: serializer.fromJson<String>(json['date']),
      hour: serializer.fromJson<int>(json['hour']),
      stepCount: serializer.fromJson<int>(json['stepCount']),
      source: serializer.fromJson<String>(json['source']),
      capturedAt: serializer.fromJson<DateTime>(json['capturedAt']),
      synced: serializer.fromJson<bool>(json['synced']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'memberId': serializer.toJson<String>(memberId),
      'date': serializer.toJson<String>(date),
      'hour': serializer.toJson<int>(hour),
      'stepCount': serializer.toJson<int>(stepCount),
      'source': serializer.toJson<String>(source),
      'capturedAt': serializer.toJson<DateTime>(capturedAt),
      'synced': serializer.toJson<bool>(synced),
    };
  }

  StepHourlyRawData copyWith({
    int? id,
    String? memberId,
    String? date,
    int? hour,
    int? stepCount,
    String? source,
    DateTime? capturedAt,
    bool? synced,
  }) => StepHourlyRawData(
    id: id ?? this.id,
    memberId: memberId ?? this.memberId,
    date: date ?? this.date,
    hour: hour ?? this.hour,
    stepCount: stepCount ?? this.stepCount,
    source: source ?? this.source,
    capturedAt: capturedAt ?? this.capturedAt,
    synced: synced ?? this.synced,
  );
  StepHourlyRawData copyWithCompanion(StepHourlyRawCompanion data) {
    return StepHourlyRawData(
      id: data.id.present ? data.id.value : this.id,
      memberId: data.memberId.present ? data.memberId.value : this.memberId,
      date: data.date.present ? data.date.value : this.date,
      hour: data.hour.present ? data.hour.value : this.hour,
      stepCount: data.stepCount.present ? data.stepCount.value : this.stepCount,
      source: data.source.present ? data.source.value : this.source,
      capturedAt: data.capturedAt.present
          ? data.capturedAt.value
          : this.capturedAt,
      synced: data.synced.present ? data.synced.value : this.synced,
    );
  }

  @override
  String toString() {
    return (StringBuffer('StepHourlyRawData(')
          ..write('id: $id, ')
          ..write('memberId: $memberId, ')
          ..write('date: $date, ')
          ..write('hour: $hour, ')
          ..write('stepCount: $stepCount, ')
          ..write('source: $source, ')
          ..write('capturedAt: $capturedAt, ')
          ..write('synced: $synced')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
    id,
    memberId,
    date,
    hour,
    stepCount,
    source,
    capturedAt,
    synced,
  );
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is StepHourlyRawData &&
          other.id == this.id &&
          other.memberId == this.memberId &&
          other.date == this.date &&
          other.hour == this.hour &&
          other.stepCount == this.stepCount &&
          other.source == this.source &&
          other.capturedAt == this.capturedAt &&
          other.synced == this.synced);
}

class StepHourlyRawCompanion extends UpdateCompanion<StepHourlyRawData> {
  final Value<int> id;
  final Value<String> memberId;
  final Value<String> date;
  final Value<int> hour;
  final Value<int> stepCount;
  final Value<String> source;
  final Value<DateTime> capturedAt;
  final Value<bool> synced;
  const StepHourlyRawCompanion({
    this.id = const Value.absent(),
    this.memberId = const Value.absent(),
    this.date = const Value.absent(),
    this.hour = const Value.absent(),
    this.stepCount = const Value.absent(),
    this.source = const Value.absent(),
    this.capturedAt = const Value.absent(),
    this.synced = const Value.absent(),
  });
  StepHourlyRawCompanion.insert({
    this.id = const Value.absent(),
    required String memberId,
    required String date,
    required int hour,
    required int stepCount,
    required String source,
    required DateTime capturedAt,
    this.synced = const Value.absent(),
  }) : memberId = Value(memberId),
       date = Value(date),
       hour = Value(hour),
       stepCount = Value(stepCount),
       source = Value(source),
       capturedAt = Value(capturedAt);
  static Insertable<StepHourlyRawData> custom({
    Expression<int>? id,
    Expression<String>? memberId,
    Expression<String>? date,
    Expression<int>? hour,
    Expression<int>? stepCount,
    Expression<String>? source,
    Expression<DateTime>? capturedAt,
    Expression<bool>? synced,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (memberId != null) 'member_id': memberId,
      if (date != null) 'date': date,
      if (hour != null) 'hour': hour,
      if (stepCount != null) 'step_count': stepCount,
      if (source != null) 'source': source,
      if (capturedAt != null) 'captured_at': capturedAt,
      if (synced != null) 'synced': synced,
    });
  }

  StepHourlyRawCompanion copyWith({
    Value<int>? id,
    Value<String>? memberId,
    Value<String>? date,
    Value<int>? hour,
    Value<int>? stepCount,
    Value<String>? source,
    Value<DateTime>? capturedAt,
    Value<bool>? synced,
  }) {
    return StepHourlyRawCompanion(
      id: id ?? this.id,
      memberId: memberId ?? this.memberId,
      date: date ?? this.date,
      hour: hour ?? this.hour,
      stepCount: stepCount ?? this.stepCount,
      source: source ?? this.source,
      capturedAt: capturedAt ?? this.capturedAt,
      synced: synced ?? this.synced,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (memberId.present) {
      map['member_id'] = Variable<String>(memberId.value);
    }
    if (date.present) {
      map['date'] = Variable<String>(date.value);
    }
    if (hour.present) {
      map['hour'] = Variable<int>(hour.value);
    }
    if (stepCount.present) {
      map['step_count'] = Variable<int>(stepCount.value);
    }
    if (source.present) {
      map['source'] = Variable<String>(source.value);
    }
    if (capturedAt.present) {
      map['captured_at'] = Variable<DateTime>(capturedAt.value);
    }
    if (synced.present) {
      map['synced'] = Variable<bool>(synced.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('StepHourlyRawCompanion(')
          ..write('id: $id, ')
          ..write('memberId: $memberId, ')
          ..write('date: $date, ')
          ..write('hour: $hour, ')
          ..write('stepCount: $stepCount, ')
          ..write('source: $source, ')
          ..write('capturedAt: $capturedAt, ')
          ..write('synced: $synced')
          ..write(')'))
        .toString();
  }
}

class $StepDailySummaryTable extends StepDailySummary
    with TableInfo<$StepDailySummaryTable, StepDailySummaryData> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $StepDailySummaryTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _memberIdMeta = const VerificationMeta(
    'memberId',
  );
  @override
  late final GeneratedColumn<String> memberId = GeneratedColumn<String>(
    'member_id',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _dateMeta = const VerificationMeta('date');
  @override
  late final GeneratedColumn<String> date = GeneratedColumn<String>(
    'date',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _totalStepsMeta = const VerificationMeta(
    'totalSteps',
  );
  @override
  late final GeneratedColumn<int> totalSteps = GeneratedColumn<int>(
    'total_steps',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _activeHoursMeta = const VerificationMeta(
    'activeHours',
  );
  @override
  late final GeneratedColumn<int> activeHours = GeneratedColumn<int>(
    'active_hours',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _peakHourMeta = const VerificationMeta(
    'peakHour',
  );
  @override
  late final GeneratedColumn<int> peakHour = GeneratedColumn<int>(
    'peak_hour',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _firstActiveHourMeta = const VerificationMeta(
    'firstActiveHour',
  );
  @override
  late final GeneratedColumn<int> firstActiveHour = GeneratedColumn<int>(
    'first_active_hour',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _lastActiveHourMeta = const VerificationMeta(
    'lastActiveHour',
  );
  @override
  late final GeneratedColumn<int> lastActiveHour = GeneratedColumn<int>(
    'last_active_hour',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _activityWindowHoursMeta =
      const VerificationMeta('activityWindowHours');
  @override
  late final GeneratedColumn<double> activityWindowHours =
      GeneratedColumn<double>(
        'activity_window_hours',
        aliasedName,
        false,
        type: DriftSqlType.double,
        requiredDuringInsert: true,
      );
  static const VerificationMeta _dayOfWeekMeta = const VerificationMeta(
    'dayOfWeek',
  );
  @override
  late final GeneratedColumn<int> dayOfWeek = GeneratedColumn<int>(
    'day_of_week',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _hasWearableSleepMeta = const VerificationMeta(
    'hasWearableSleep',
  );
  @override
  late final GeneratedColumn<bool> hasWearableSleep = GeneratedColumn<bool>(
    'has_wearable_sleep',
    aliasedName,
    false,
    type: DriftSqlType.bool,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'CHECK ("has_wearable_sleep" IN (0, 1))',
    ),
    defaultValue: const Constant(false),
  );
  static const VerificationMeta _sleepOnsetTimeMeta = const VerificationMeta(
    'sleepOnsetTime',
  );
  @override
  late final GeneratedColumn<int> sleepOnsetTime = GeneratedColumn<int>(
    'sleep_onset_time',
    aliasedName,
    true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _sleepOffsetTimeMeta = const VerificationMeta(
    'sleepOffsetTime',
  );
  @override
  late final GeneratedColumn<int> sleepOffsetTime = GeneratedColumn<int>(
    'sleep_offset_time',
    aliasedName,
    true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _sleepDurationMinMeta = const VerificationMeta(
    'sleepDurationMin',
  );
  @override
  late final GeneratedColumn<int> sleepDurationMin = GeneratedColumn<int>(
    'sleep_duration_min',
    aliasedName,
    true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _sleepEfficiencyPctMeta =
      const VerificationMeta('sleepEfficiencyPct');
  @override
  late final GeneratedColumn<double> sleepEfficiencyPct =
      GeneratedColumn<double>(
        'sleep_efficiency_pct',
        aliasedName,
        true,
        type: DriftSqlType.double,
        requiredDuringInsert: false,
      );
  static const VerificationMeta _wakeEpisodesMeta = const VerificationMeta(
    'wakeEpisodes',
  );
  @override
  late final GeneratedColumn<int> wakeEpisodes = GeneratedColumn<int>(
    'wake_episodes',
    aliasedName,
    true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _computedAtMeta = const VerificationMeta(
    'computedAt',
  );
  @override
  late final GeneratedColumn<DateTime> computedAt = GeneratedColumn<DateTime>(
    'computed_at',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  @override
  List<GeneratedColumn> get $columns => [
    memberId,
    date,
    totalSteps,
    activeHours,
    peakHour,
    firstActiveHour,
    lastActiveHour,
    activityWindowHours,
    dayOfWeek,
    hasWearableSleep,
    sleepOnsetTime,
    sleepOffsetTime,
    sleepDurationMin,
    sleepEfficiencyPct,
    wakeEpisodes,
    computedAt,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'step_daily_summary';
  @override
  VerificationContext validateIntegrity(
    Insertable<StepDailySummaryData> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('member_id')) {
      context.handle(
        _memberIdMeta,
        memberId.isAcceptableOrUnknown(data['member_id']!, _memberIdMeta),
      );
    } else if (isInserting) {
      context.missing(_memberIdMeta);
    }
    if (data.containsKey('date')) {
      context.handle(
        _dateMeta,
        date.isAcceptableOrUnknown(data['date']!, _dateMeta),
      );
    } else if (isInserting) {
      context.missing(_dateMeta);
    }
    if (data.containsKey('total_steps')) {
      context.handle(
        _totalStepsMeta,
        totalSteps.isAcceptableOrUnknown(data['total_steps']!, _totalStepsMeta),
      );
    } else if (isInserting) {
      context.missing(_totalStepsMeta);
    }
    if (data.containsKey('active_hours')) {
      context.handle(
        _activeHoursMeta,
        activeHours.isAcceptableOrUnknown(
          data['active_hours']!,
          _activeHoursMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_activeHoursMeta);
    }
    if (data.containsKey('peak_hour')) {
      context.handle(
        _peakHourMeta,
        peakHour.isAcceptableOrUnknown(data['peak_hour']!, _peakHourMeta),
      );
    } else if (isInserting) {
      context.missing(_peakHourMeta);
    }
    if (data.containsKey('first_active_hour')) {
      context.handle(
        _firstActiveHourMeta,
        firstActiveHour.isAcceptableOrUnknown(
          data['first_active_hour']!,
          _firstActiveHourMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_firstActiveHourMeta);
    }
    if (data.containsKey('last_active_hour')) {
      context.handle(
        _lastActiveHourMeta,
        lastActiveHour.isAcceptableOrUnknown(
          data['last_active_hour']!,
          _lastActiveHourMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_lastActiveHourMeta);
    }
    if (data.containsKey('activity_window_hours')) {
      context.handle(
        _activityWindowHoursMeta,
        activityWindowHours.isAcceptableOrUnknown(
          data['activity_window_hours']!,
          _activityWindowHoursMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_activityWindowHoursMeta);
    }
    if (data.containsKey('day_of_week')) {
      context.handle(
        _dayOfWeekMeta,
        dayOfWeek.isAcceptableOrUnknown(data['day_of_week']!, _dayOfWeekMeta),
      );
    } else if (isInserting) {
      context.missing(_dayOfWeekMeta);
    }
    if (data.containsKey('has_wearable_sleep')) {
      context.handle(
        _hasWearableSleepMeta,
        hasWearableSleep.isAcceptableOrUnknown(
          data['has_wearable_sleep']!,
          _hasWearableSleepMeta,
        ),
      );
    }
    if (data.containsKey('sleep_onset_time')) {
      context.handle(
        _sleepOnsetTimeMeta,
        sleepOnsetTime.isAcceptableOrUnknown(
          data['sleep_onset_time']!,
          _sleepOnsetTimeMeta,
        ),
      );
    }
    if (data.containsKey('sleep_offset_time')) {
      context.handle(
        _sleepOffsetTimeMeta,
        sleepOffsetTime.isAcceptableOrUnknown(
          data['sleep_offset_time']!,
          _sleepOffsetTimeMeta,
        ),
      );
    }
    if (data.containsKey('sleep_duration_min')) {
      context.handle(
        _sleepDurationMinMeta,
        sleepDurationMin.isAcceptableOrUnknown(
          data['sleep_duration_min']!,
          _sleepDurationMinMeta,
        ),
      );
    }
    if (data.containsKey('sleep_efficiency_pct')) {
      context.handle(
        _sleepEfficiencyPctMeta,
        sleepEfficiencyPct.isAcceptableOrUnknown(
          data['sleep_efficiency_pct']!,
          _sleepEfficiencyPctMeta,
        ),
      );
    }
    if (data.containsKey('wake_episodes')) {
      context.handle(
        _wakeEpisodesMeta,
        wakeEpisodes.isAcceptableOrUnknown(
          data['wake_episodes']!,
          _wakeEpisodesMeta,
        ),
      );
    }
    if (data.containsKey('computed_at')) {
      context.handle(
        _computedAtMeta,
        computedAt.isAcceptableOrUnknown(data['computed_at']!, _computedAtMeta),
      );
    } else if (isInserting) {
      context.missing(_computedAtMeta);
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {memberId, date};
  @override
  StepDailySummaryData map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return StepDailySummaryData(
      memberId: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}member_id'],
      )!,
      date: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}date'],
      )!,
      totalSteps: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}total_steps'],
      )!,
      activeHours: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}active_hours'],
      )!,
      peakHour: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}peak_hour'],
      )!,
      firstActiveHour: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}first_active_hour'],
      )!,
      lastActiveHour: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}last_active_hour'],
      )!,
      activityWindowHours: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}activity_window_hours'],
      )!,
      dayOfWeek: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}day_of_week'],
      )!,
      hasWearableSleep: attachedDatabase.typeMapping.read(
        DriftSqlType.bool,
        data['${effectivePrefix}has_wearable_sleep'],
      )!,
      sleepOnsetTime: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}sleep_onset_time'],
      ),
      sleepOffsetTime: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}sleep_offset_time'],
      ),
      sleepDurationMin: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}sleep_duration_min'],
      ),
      sleepEfficiencyPct: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}sleep_efficiency_pct'],
      ),
      wakeEpisodes: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}wake_episodes'],
      ),
      computedAt: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}computed_at'],
      )!,
    );
  }

  @override
  $StepDailySummaryTable createAlias(String alias) {
    return $StepDailySummaryTable(attachedDatabase, alias);
  }
}

class StepDailySummaryData extends DataClass
    implements Insertable<StepDailySummaryData> {
  final String memberId;
  final String date;
  final int totalSteps;
  final int activeHours;
  final int peakHour;
  final int firstActiveHour;
  final int lastActiveHour;
  final double activityWindowHours;
  final int dayOfWeek;
  final bool hasWearableSleep;
  final int? sleepOnsetTime;
  final int? sleepOffsetTime;
  final int? sleepDurationMin;
  final double? sleepEfficiencyPct;
  final int? wakeEpisodes;
  final DateTime computedAt;
  const StepDailySummaryData({
    required this.memberId,
    required this.date,
    required this.totalSteps,
    required this.activeHours,
    required this.peakHour,
    required this.firstActiveHour,
    required this.lastActiveHour,
    required this.activityWindowHours,
    required this.dayOfWeek,
    required this.hasWearableSleep,
    this.sleepOnsetTime,
    this.sleepOffsetTime,
    this.sleepDurationMin,
    this.sleepEfficiencyPct,
    this.wakeEpisodes,
    required this.computedAt,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['member_id'] = Variable<String>(memberId);
    map['date'] = Variable<String>(date);
    map['total_steps'] = Variable<int>(totalSteps);
    map['active_hours'] = Variable<int>(activeHours);
    map['peak_hour'] = Variable<int>(peakHour);
    map['first_active_hour'] = Variable<int>(firstActiveHour);
    map['last_active_hour'] = Variable<int>(lastActiveHour);
    map['activity_window_hours'] = Variable<double>(activityWindowHours);
    map['day_of_week'] = Variable<int>(dayOfWeek);
    map['has_wearable_sleep'] = Variable<bool>(hasWearableSleep);
    if (!nullToAbsent || sleepOnsetTime != null) {
      map['sleep_onset_time'] = Variable<int>(sleepOnsetTime);
    }
    if (!nullToAbsent || sleepOffsetTime != null) {
      map['sleep_offset_time'] = Variable<int>(sleepOffsetTime);
    }
    if (!nullToAbsent || sleepDurationMin != null) {
      map['sleep_duration_min'] = Variable<int>(sleepDurationMin);
    }
    if (!nullToAbsent || sleepEfficiencyPct != null) {
      map['sleep_efficiency_pct'] = Variable<double>(sleepEfficiencyPct);
    }
    if (!nullToAbsent || wakeEpisodes != null) {
      map['wake_episodes'] = Variable<int>(wakeEpisodes);
    }
    map['computed_at'] = Variable<DateTime>(computedAt);
    return map;
  }

  StepDailySummaryCompanion toCompanion(bool nullToAbsent) {
    return StepDailySummaryCompanion(
      memberId: Value(memberId),
      date: Value(date),
      totalSteps: Value(totalSteps),
      activeHours: Value(activeHours),
      peakHour: Value(peakHour),
      firstActiveHour: Value(firstActiveHour),
      lastActiveHour: Value(lastActiveHour),
      activityWindowHours: Value(activityWindowHours),
      dayOfWeek: Value(dayOfWeek),
      hasWearableSleep: Value(hasWearableSleep),
      sleepOnsetTime: sleepOnsetTime == null && nullToAbsent
          ? const Value.absent()
          : Value(sleepOnsetTime),
      sleepOffsetTime: sleepOffsetTime == null && nullToAbsent
          ? const Value.absent()
          : Value(sleepOffsetTime),
      sleepDurationMin: sleepDurationMin == null && nullToAbsent
          ? const Value.absent()
          : Value(sleepDurationMin),
      sleepEfficiencyPct: sleepEfficiencyPct == null && nullToAbsent
          ? const Value.absent()
          : Value(sleepEfficiencyPct),
      wakeEpisodes: wakeEpisodes == null && nullToAbsent
          ? const Value.absent()
          : Value(wakeEpisodes),
      computedAt: Value(computedAt),
    );
  }

  factory StepDailySummaryData.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return StepDailySummaryData(
      memberId: serializer.fromJson<String>(json['memberId']),
      date: serializer.fromJson<String>(json['date']),
      totalSteps: serializer.fromJson<int>(json['totalSteps']),
      activeHours: serializer.fromJson<int>(json['activeHours']),
      peakHour: serializer.fromJson<int>(json['peakHour']),
      firstActiveHour: serializer.fromJson<int>(json['firstActiveHour']),
      lastActiveHour: serializer.fromJson<int>(json['lastActiveHour']),
      activityWindowHours: serializer.fromJson<double>(
        json['activityWindowHours'],
      ),
      dayOfWeek: serializer.fromJson<int>(json['dayOfWeek']),
      hasWearableSleep: serializer.fromJson<bool>(json['hasWearableSleep']),
      sleepOnsetTime: serializer.fromJson<int?>(json['sleepOnsetTime']),
      sleepOffsetTime: serializer.fromJson<int?>(json['sleepOffsetTime']),
      sleepDurationMin: serializer.fromJson<int?>(json['sleepDurationMin']),
      sleepEfficiencyPct: serializer.fromJson<double?>(
        json['sleepEfficiencyPct'],
      ),
      wakeEpisodes: serializer.fromJson<int?>(json['wakeEpisodes']),
      computedAt: serializer.fromJson<DateTime>(json['computedAt']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'memberId': serializer.toJson<String>(memberId),
      'date': serializer.toJson<String>(date),
      'totalSteps': serializer.toJson<int>(totalSteps),
      'activeHours': serializer.toJson<int>(activeHours),
      'peakHour': serializer.toJson<int>(peakHour),
      'firstActiveHour': serializer.toJson<int>(firstActiveHour),
      'lastActiveHour': serializer.toJson<int>(lastActiveHour),
      'activityWindowHours': serializer.toJson<double>(activityWindowHours),
      'dayOfWeek': serializer.toJson<int>(dayOfWeek),
      'hasWearableSleep': serializer.toJson<bool>(hasWearableSleep),
      'sleepOnsetTime': serializer.toJson<int?>(sleepOnsetTime),
      'sleepOffsetTime': serializer.toJson<int?>(sleepOffsetTime),
      'sleepDurationMin': serializer.toJson<int?>(sleepDurationMin),
      'sleepEfficiencyPct': serializer.toJson<double?>(sleepEfficiencyPct),
      'wakeEpisodes': serializer.toJson<int?>(wakeEpisodes),
      'computedAt': serializer.toJson<DateTime>(computedAt),
    };
  }

  StepDailySummaryData copyWith({
    String? memberId,
    String? date,
    int? totalSteps,
    int? activeHours,
    int? peakHour,
    int? firstActiveHour,
    int? lastActiveHour,
    double? activityWindowHours,
    int? dayOfWeek,
    bool? hasWearableSleep,
    Value<int?> sleepOnsetTime = const Value.absent(),
    Value<int?> sleepOffsetTime = const Value.absent(),
    Value<int?> sleepDurationMin = const Value.absent(),
    Value<double?> sleepEfficiencyPct = const Value.absent(),
    Value<int?> wakeEpisodes = const Value.absent(),
    DateTime? computedAt,
  }) => StepDailySummaryData(
    memberId: memberId ?? this.memberId,
    date: date ?? this.date,
    totalSteps: totalSteps ?? this.totalSteps,
    activeHours: activeHours ?? this.activeHours,
    peakHour: peakHour ?? this.peakHour,
    firstActiveHour: firstActiveHour ?? this.firstActiveHour,
    lastActiveHour: lastActiveHour ?? this.lastActiveHour,
    activityWindowHours: activityWindowHours ?? this.activityWindowHours,
    dayOfWeek: dayOfWeek ?? this.dayOfWeek,
    hasWearableSleep: hasWearableSleep ?? this.hasWearableSleep,
    sleepOnsetTime: sleepOnsetTime.present
        ? sleepOnsetTime.value
        : this.sleepOnsetTime,
    sleepOffsetTime: sleepOffsetTime.present
        ? sleepOffsetTime.value
        : this.sleepOffsetTime,
    sleepDurationMin: sleepDurationMin.present
        ? sleepDurationMin.value
        : this.sleepDurationMin,
    sleepEfficiencyPct: sleepEfficiencyPct.present
        ? sleepEfficiencyPct.value
        : this.sleepEfficiencyPct,
    wakeEpisodes: wakeEpisodes.present ? wakeEpisodes.value : this.wakeEpisodes,
    computedAt: computedAt ?? this.computedAt,
  );
  StepDailySummaryData copyWithCompanion(StepDailySummaryCompanion data) {
    return StepDailySummaryData(
      memberId: data.memberId.present ? data.memberId.value : this.memberId,
      date: data.date.present ? data.date.value : this.date,
      totalSteps: data.totalSteps.present
          ? data.totalSteps.value
          : this.totalSteps,
      activeHours: data.activeHours.present
          ? data.activeHours.value
          : this.activeHours,
      peakHour: data.peakHour.present ? data.peakHour.value : this.peakHour,
      firstActiveHour: data.firstActiveHour.present
          ? data.firstActiveHour.value
          : this.firstActiveHour,
      lastActiveHour: data.lastActiveHour.present
          ? data.lastActiveHour.value
          : this.lastActiveHour,
      activityWindowHours: data.activityWindowHours.present
          ? data.activityWindowHours.value
          : this.activityWindowHours,
      dayOfWeek: data.dayOfWeek.present ? data.dayOfWeek.value : this.dayOfWeek,
      hasWearableSleep: data.hasWearableSleep.present
          ? data.hasWearableSleep.value
          : this.hasWearableSleep,
      sleepOnsetTime: data.sleepOnsetTime.present
          ? data.sleepOnsetTime.value
          : this.sleepOnsetTime,
      sleepOffsetTime: data.sleepOffsetTime.present
          ? data.sleepOffsetTime.value
          : this.sleepOffsetTime,
      sleepDurationMin: data.sleepDurationMin.present
          ? data.sleepDurationMin.value
          : this.sleepDurationMin,
      sleepEfficiencyPct: data.sleepEfficiencyPct.present
          ? data.sleepEfficiencyPct.value
          : this.sleepEfficiencyPct,
      wakeEpisodes: data.wakeEpisodes.present
          ? data.wakeEpisodes.value
          : this.wakeEpisodes,
      computedAt: data.computedAt.present
          ? data.computedAt.value
          : this.computedAt,
    );
  }

  @override
  String toString() {
    return (StringBuffer('StepDailySummaryData(')
          ..write('memberId: $memberId, ')
          ..write('date: $date, ')
          ..write('totalSteps: $totalSteps, ')
          ..write('activeHours: $activeHours, ')
          ..write('peakHour: $peakHour, ')
          ..write('firstActiveHour: $firstActiveHour, ')
          ..write('lastActiveHour: $lastActiveHour, ')
          ..write('activityWindowHours: $activityWindowHours, ')
          ..write('dayOfWeek: $dayOfWeek, ')
          ..write('hasWearableSleep: $hasWearableSleep, ')
          ..write('sleepOnsetTime: $sleepOnsetTime, ')
          ..write('sleepOffsetTime: $sleepOffsetTime, ')
          ..write('sleepDurationMin: $sleepDurationMin, ')
          ..write('sleepEfficiencyPct: $sleepEfficiencyPct, ')
          ..write('wakeEpisodes: $wakeEpisodes, ')
          ..write('computedAt: $computedAt')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
    memberId,
    date,
    totalSteps,
    activeHours,
    peakHour,
    firstActiveHour,
    lastActiveHour,
    activityWindowHours,
    dayOfWeek,
    hasWearableSleep,
    sleepOnsetTime,
    sleepOffsetTime,
    sleepDurationMin,
    sleepEfficiencyPct,
    wakeEpisodes,
    computedAt,
  );
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is StepDailySummaryData &&
          other.memberId == this.memberId &&
          other.date == this.date &&
          other.totalSteps == this.totalSteps &&
          other.activeHours == this.activeHours &&
          other.peakHour == this.peakHour &&
          other.firstActiveHour == this.firstActiveHour &&
          other.lastActiveHour == this.lastActiveHour &&
          other.activityWindowHours == this.activityWindowHours &&
          other.dayOfWeek == this.dayOfWeek &&
          other.hasWearableSleep == this.hasWearableSleep &&
          other.sleepOnsetTime == this.sleepOnsetTime &&
          other.sleepOffsetTime == this.sleepOffsetTime &&
          other.sleepDurationMin == this.sleepDurationMin &&
          other.sleepEfficiencyPct == this.sleepEfficiencyPct &&
          other.wakeEpisodes == this.wakeEpisodes &&
          other.computedAt == this.computedAt);
}

class StepDailySummaryCompanion extends UpdateCompanion<StepDailySummaryData> {
  final Value<String> memberId;
  final Value<String> date;
  final Value<int> totalSteps;
  final Value<int> activeHours;
  final Value<int> peakHour;
  final Value<int> firstActiveHour;
  final Value<int> lastActiveHour;
  final Value<double> activityWindowHours;
  final Value<int> dayOfWeek;
  final Value<bool> hasWearableSleep;
  final Value<int?> sleepOnsetTime;
  final Value<int?> sleepOffsetTime;
  final Value<int?> sleepDurationMin;
  final Value<double?> sleepEfficiencyPct;
  final Value<int?> wakeEpisodes;
  final Value<DateTime> computedAt;
  final Value<int> rowid;
  const StepDailySummaryCompanion({
    this.memberId = const Value.absent(),
    this.date = const Value.absent(),
    this.totalSteps = const Value.absent(),
    this.activeHours = const Value.absent(),
    this.peakHour = const Value.absent(),
    this.firstActiveHour = const Value.absent(),
    this.lastActiveHour = const Value.absent(),
    this.activityWindowHours = const Value.absent(),
    this.dayOfWeek = const Value.absent(),
    this.hasWearableSleep = const Value.absent(),
    this.sleepOnsetTime = const Value.absent(),
    this.sleepOffsetTime = const Value.absent(),
    this.sleepDurationMin = const Value.absent(),
    this.sleepEfficiencyPct = const Value.absent(),
    this.wakeEpisodes = const Value.absent(),
    this.computedAt = const Value.absent(),
    this.rowid = const Value.absent(),
  });
  StepDailySummaryCompanion.insert({
    required String memberId,
    required String date,
    required int totalSteps,
    required int activeHours,
    required int peakHour,
    required int firstActiveHour,
    required int lastActiveHour,
    required double activityWindowHours,
    required int dayOfWeek,
    this.hasWearableSleep = const Value.absent(),
    this.sleepOnsetTime = const Value.absent(),
    this.sleepOffsetTime = const Value.absent(),
    this.sleepDurationMin = const Value.absent(),
    this.sleepEfficiencyPct = const Value.absent(),
    this.wakeEpisodes = const Value.absent(),
    required DateTime computedAt,
    this.rowid = const Value.absent(),
  }) : memberId = Value(memberId),
       date = Value(date),
       totalSteps = Value(totalSteps),
       activeHours = Value(activeHours),
       peakHour = Value(peakHour),
       firstActiveHour = Value(firstActiveHour),
       lastActiveHour = Value(lastActiveHour),
       activityWindowHours = Value(activityWindowHours),
       dayOfWeek = Value(dayOfWeek),
       computedAt = Value(computedAt);
  static Insertable<StepDailySummaryData> custom({
    Expression<String>? memberId,
    Expression<String>? date,
    Expression<int>? totalSteps,
    Expression<int>? activeHours,
    Expression<int>? peakHour,
    Expression<int>? firstActiveHour,
    Expression<int>? lastActiveHour,
    Expression<double>? activityWindowHours,
    Expression<int>? dayOfWeek,
    Expression<bool>? hasWearableSleep,
    Expression<int>? sleepOnsetTime,
    Expression<int>? sleepOffsetTime,
    Expression<int>? sleepDurationMin,
    Expression<double>? sleepEfficiencyPct,
    Expression<int>? wakeEpisodes,
    Expression<DateTime>? computedAt,
    Expression<int>? rowid,
  }) {
    return RawValuesInsertable({
      if (memberId != null) 'member_id': memberId,
      if (date != null) 'date': date,
      if (totalSteps != null) 'total_steps': totalSteps,
      if (activeHours != null) 'active_hours': activeHours,
      if (peakHour != null) 'peak_hour': peakHour,
      if (firstActiveHour != null) 'first_active_hour': firstActiveHour,
      if (lastActiveHour != null) 'last_active_hour': lastActiveHour,
      if (activityWindowHours != null)
        'activity_window_hours': activityWindowHours,
      if (dayOfWeek != null) 'day_of_week': dayOfWeek,
      if (hasWearableSleep != null) 'has_wearable_sleep': hasWearableSleep,
      if (sleepOnsetTime != null) 'sleep_onset_time': sleepOnsetTime,
      if (sleepOffsetTime != null) 'sleep_offset_time': sleepOffsetTime,
      if (sleepDurationMin != null) 'sleep_duration_min': sleepDurationMin,
      if (sleepEfficiencyPct != null)
        'sleep_efficiency_pct': sleepEfficiencyPct,
      if (wakeEpisodes != null) 'wake_episodes': wakeEpisodes,
      if (computedAt != null) 'computed_at': computedAt,
      if (rowid != null) 'rowid': rowid,
    });
  }

  StepDailySummaryCompanion copyWith({
    Value<String>? memberId,
    Value<String>? date,
    Value<int>? totalSteps,
    Value<int>? activeHours,
    Value<int>? peakHour,
    Value<int>? firstActiveHour,
    Value<int>? lastActiveHour,
    Value<double>? activityWindowHours,
    Value<int>? dayOfWeek,
    Value<bool>? hasWearableSleep,
    Value<int?>? sleepOnsetTime,
    Value<int?>? sleepOffsetTime,
    Value<int?>? sleepDurationMin,
    Value<double?>? sleepEfficiencyPct,
    Value<int?>? wakeEpisodes,
    Value<DateTime>? computedAt,
    Value<int>? rowid,
  }) {
    return StepDailySummaryCompanion(
      memberId: memberId ?? this.memberId,
      date: date ?? this.date,
      totalSteps: totalSteps ?? this.totalSteps,
      activeHours: activeHours ?? this.activeHours,
      peakHour: peakHour ?? this.peakHour,
      firstActiveHour: firstActiveHour ?? this.firstActiveHour,
      lastActiveHour: lastActiveHour ?? this.lastActiveHour,
      activityWindowHours: activityWindowHours ?? this.activityWindowHours,
      dayOfWeek: dayOfWeek ?? this.dayOfWeek,
      hasWearableSleep: hasWearableSleep ?? this.hasWearableSleep,
      sleepOnsetTime: sleepOnsetTime ?? this.sleepOnsetTime,
      sleepOffsetTime: sleepOffsetTime ?? this.sleepOffsetTime,
      sleepDurationMin: sleepDurationMin ?? this.sleepDurationMin,
      sleepEfficiencyPct: sleepEfficiencyPct ?? this.sleepEfficiencyPct,
      wakeEpisodes: wakeEpisodes ?? this.wakeEpisodes,
      computedAt: computedAt ?? this.computedAt,
      rowid: rowid ?? this.rowid,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (memberId.present) {
      map['member_id'] = Variable<String>(memberId.value);
    }
    if (date.present) {
      map['date'] = Variable<String>(date.value);
    }
    if (totalSteps.present) {
      map['total_steps'] = Variable<int>(totalSteps.value);
    }
    if (activeHours.present) {
      map['active_hours'] = Variable<int>(activeHours.value);
    }
    if (peakHour.present) {
      map['peak_hour'] = Variable<int>(peakHour.value);
    }
    if (firstActiveHour.present) {
      map['first_active_hour'] = Variable<int>(firstActiveHour.value);
    }
    if (lastActiveHour.present) {
      map['last_active_hour'] = Variable<int>(lastActiveHour.value);
    }
    if (activityWindowHours.present) {
      map['activity_window_hours'] = Variable<double>(
        activityWindowHours.value,
      );
    }
    if (dayOfWeek.present) {
      map['day_of_week'] = Variable<int>(dayOfWeek.value);
    }
    if (hasWearableSleep.present) {
      map['has_wearable_sleep'] = Variable<bool>(hasWearableSleep.value);
    }
    if (sleepOnsetTime.present) {
      map['sleep_onset_time'] = Variable<int>(sleepOnsetTime.value);
    }
    if (sleepOffsetTime.present) {
      map['sleep_offset_time'] = Variable<int>(sleepOffsetTime.value);
    }
    if (sleepDurationMin.present) {
      map['sleep_duration_min'] = Variable<int>(sleepDurationMin.value);
    }
    if (sleepEfficiencyPct.present) {
      map['sleep_efficiency_pct'] = Variable<double>(sleepEfficiencyPct.value);
    }
    if (wakeEpisodes.present) {
      map['wake_episodes'] = Variable<int>(wakeEpisodes.value);
    }
    if (computedAt.present) {
      map['computed_at'] = Variable<DateTime>(computedAt.value);
    }
    if (rowid.present) {
      map['rowid'] = Variable<int>(rowid.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('StepDailySummaryCompanion(')
          ..write('memberId: $memberId, ')
          ..write('date: $date, ')
          ..write('totalSteps: $totalSteps, ')
          ..write('activeHours: $activeHours, ')
          ..write('peakHour: $peakHour, ')
          ..write('firstActiveHour: $firstActiveHour, ')
          ..write('lastActiveHour: $lastActiveHour, ')
          ..write('activityWindowHours: $activityWindowHours, ')
          ..write('dayOfWeek: $dayOfWeek, ')
          ..write('hasWearableSleep: $hasWearableSleep, ')
          ..write('sleepOnsetTime: $sleepOnsetTime, ')
          ..write('sleepOffsetTime: $sleepOffsetTime, ')
          ..write('sleepDurationMin: $sleepDurationMin, ')
          ..write('sleepEfficiencyPct: $sleepEfficiencyPct, ')
          ..write('wakeEpisodes: $wakeEpisodes, ')
          ..write('computedAt: $computedAt, ')
          ..write('rowid: $rowid')
          ..write(')'))
        .toString();
  }
}

class $BehaviouralFlagsTable extends BehaviouralFlags
    with TableInfo<$BehaviouralFlagsTable, BehaviouralFlag> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $BehaviouralFlagsTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _memberIdMeta = const VerificationMeta(
    'memberId',
  );
  @override
  late final GeneratedColumn<String> memberId = GeneratedColumn<String>(
    'member_id',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _flagDateMeta = const VerificationMeta(
    'flagDate',
  );
  @override
  late final GeneratedColumn<String> flagDate = GeneratedColumn<String>(
    'flag_date',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _flagTypeMeta = const VerificationMeta(
    'flagType',
  );
  @override
  late final GeneratedColumn<String> flagType = GeneratedColumn<String>(
    'flag_type',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _severityMeta = const VerificationMeta(
    'severity',
  );
  @override
  late final GeneratedColumn<String> severity = GeneratedColumn<String>(
    'severity',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _valueMeta = const VerificationMeta('value');
  @override
  late final GeneratedColumn<double> value = GeneratedColumn<double>(
    'value',
    aliasedName,
    false,
    type: DriftSqlType.double,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _baselineMeta = const VerificationMeta(
    'baseline',
  );
  @override
  late final GeneratedColumn<double> baseline = GeneratedColumn<double>(
    'baseline',
    aliasedName,
    false,
    type: DriftSqlType.double,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _syncedMeta = const VerificationMeta('synced');
  @override
  late final GeneratedColumn<bool> synced = GeneratedColumn<bool>(
    'synced',
    aliasedName,
    false,
    type: DriftSqlType.bool,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'CHECK ("synced" IN (0, 1))',
    ),
    defaultValue: const Constant(false),
  );
  static const VerificationMeta _createdAtMeta = const VerificationMeta(
    'createdAt',
  );
  @override
  late final GeneratedColumn<DateTime> createdAt = GeneratedColumn<DateTime>(
    'created_at',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: false,
    defaultValue: currentDateAndTime,
  );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    memberId,
    flagDate,
    flagType,
    severity,
    value,
    baseline,
    synced,
    createdAt,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'behavioural_flags';
  @override
  VerificationContext validateIntegrity(
    Insertable<BehaviouralFlag> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('member_id')) {
      context.handle(
        _memberIdMeta,
        memberId.isAcceptableOrUnknown(data['member_id']!, _memberIdMeta),
      );
    } else if (isInserting) {
      context.missing(_memberIdMeta);
    }
    if (data.containsKey('flag_date')) {
      context.handle(
        _flagDateMeta,
        flagDate.isAcceptableOrUnknown(data['flag_date']!, _flagDateMeta),
      );
    } else if (isInserting) {
      context.missing(_flagDateMeta);
    }
    if (data.containsKey('flag_type')) {
      context.handle(
        _flagTypeMeta,
        flagType.isAcceptableOrUnknown(data['flag_type']!, _flagTypeMeta),
      );
    } else if (isInserting) {
      context.missing(_flagTypeMeta);
    }
    if (data.containsKey('severity')) {
      context.handle(
        _severityMeta,
        severity.isAcceptableOrUnknown(data['severity']!, _severityMeta),
      );
    } else if (isInserting) {
      context.missing(_severityMeta);
    }
    if (data.containsKey('value')) {
      context.handle(
        _valueMeta,
        value.isAcceptableOrUnknown(data['value']!, _valueMeta),
      );
    } else if (isInserting) {
      context.missing(_valueMeta);
    }
    if (data.containsKey('baseline')) {
      context.handle(
        _baselineMeta,
        baseline.isAcceptableOrUnknown(data['baseline']!, _baselineMeta),
      );
    } else if (isInserting) {
      context.missing(_baselineMeta);
    }
    if (data.containsKey('synced')) {
      context.handle(
        _syncedMeta,
        synced.isAcceptableOrUnknown(data['synced']!, _syncedMeta),
      );
    }
    if (data.containsKey('created_at')) {
      context.handle(
        _createdAtMeta,
        createdAt.isAcceptableOrUnknown(data['created_at']!, _createdAtMeta),
      );
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  BehaviouralFlag map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return BehaviouralFlag(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      memberId: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}member_id'],
      )!,
      flagDate: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}flag_date'],
      )!,
      flagType: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}flag_type'],
      )!,
      severity: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}severity'],
      )!,
      value: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}value'],
      )!,
      baseline: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}baseline'],
      )!,
      synced: attachedDatabase.typeMapping.read(
        DriftSqlType.bool,
        data['${effectivePrefix}synced'],
      )!,
      createdAt: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}created_at'],
      )!,
    );
  }

  @override
  $BehaviouralFlagsTable createAlias(String alias) {
    return $BehaviouralFlagsTable(attachedDatabase, alias);
  }
}

class BehaviouralFlag extends DataClass implements Insertable<BehaviouralFlag> {
  final int id;
  final String memberId;
  final String flagDate;
  final String flagType;
  final String severity;
  final double value;
  final double baseline;
  final bool synced;
  final DateTime createdAt;
  const BehaviouralFlag({
    required this.id,
    required this.memberId,
    required this.flagDate,
    required this.flagType,
    required this.severity,
    required this.value,
    required this.baseline,
    required this.synced,
    required this.createdAt,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['member_id'] = Variable<String>(memberId);
    map['flag_date'] = Variable<String>(flagDate);
    map['flag_type'] = Variable<String>(flagType);
    map['severity'] = Variable<String>(severity);
    map['value'] = Variable<double>(value);
    map['baseline'] = Variable<double>(baseline);
    map['synced'] = Variable<bool>(synced);
    map['created_at'] = Variable<DateTime>(createdAt);
    return map;
  }

  BehaviouralFlagsCompanion toCompanion(bool nullToAbsent) {
    return BehaviouralFlagsCompanion(
      id: Value(id),
      memberId: Value(memberId),
      flagDate: Value(flagDate),
      flagType: Value(flagType),
      severity: Value(severity),
      value: Value(value),
      baseline: Value(baseline),
      synced: Value(synced),
      createdAt: Value(createdAt),
    );
  }

  factory BehaviouralFlag.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return BehaviouralFlag(
      id: serializer.fromJson<int>(json['id']),
      memberId: serializer.fromJson<String>(json['memberId']),
      flagDate: serializer.fromJson<String>(json['flagDate']),
      flagType: serializer.fromJson<String>(json['flagType']),
      severity: serializer.fromJson<String>(json['severity']),
      value: serializer.fromJson<double>(json['value']),
      baseline: serializer.fromJson<double>(json['baseline']),
      synced: serializer.fromJson<bool>(json['synced']),
      createdAt: serializer.fromJson<DateTime>(json['createdAt']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'memberId': serializer.toJson<String>(memberId),
      'flagDate': serializer.toJson<String>(flagDate),
      'flagType': serializer.toJson<String>(flagType),
      'severity': serializer.toJson<String>(severity),
      'value': serializer.toJson<double>(value),
      'baseline': serializer.toJson<double>(baseline),
      'synced': serializer.toJson<bool>(synced),
      'createdAt': serializer.toJson<DateTime>(createdAt),
    };
  }

  BehaviouralFlag copyWith({
    int? id,
    String? memberId,
    String? flagDate,
    String? flagType,
    String? severity,
    double? value,
    double? baseline,
    bool? synced,
    DateTime? createdAt,
  }) => BehaviouralFlag(
    id: id ?? this.id,
    memberId: memberId ?? this.memberId,
    flagDate: flagDate ?? this.flagDate,
    flagType: flagType ?? this.flagType,
    severity: severity ?? this.severity,
    value: value ?? this.value,
    baseline: baseline ?? this.baseline,
    synced: synced ?? this.synced,
    createdAt: createdAt ?? this.createdAt,
  );
  BehaviouralFlag copyWithCompanion(BehaviouralFlagsCompanion data) {
    return BehaviouralFlag(
      id: data.id.present ? data.id.value : this.id,
      memberId: data.memberId.present ? data.memberId.value : this.memberId,
      flagDate: data.flagDate.present ? data.flagDate.value : this.flagDate,
      flagType: data.flagType.present ? data.flagType.value : this.flagType,
      severity: data.severity.present ? data.severity.value : this.severity,
      value: data.value.present ? data.value.value : this.value,
      baseline: data.baseline.present ? data.baseline.value : this.baseline,
      synced: data.synced.present ? data.synced.value : this.synced,
      createdAt: data.createdAt.present ? data.createdAt.value : this.createdAt,
    );
  }

  @override
  String toString() {
    return (StringBuffer('BehaviouralFlag(')
          ..write('id: $id, ')
          ..write('memberId: $memberId, ')
          ..write('flagDate: $flagDate, ')
          ..write('flagType: $flagType, ')
          ..write('severity: $severity, ')
          ..write('value: $value, ')
          ..write('baseline: $baseline, ')
          ..write('synced: $synced, ')
          ..write('createdAt: $createdAt')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
    id,
    memberId,
    flagDate,
    flagType,
    severity,
    value,
    baseline,
    synced,
    createdAt,
  );
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is BehaviouralFlag &&
          other.id == this.id &&
          other.memberId == this.memberId &&
          other.flagDate == this.flagDate &&
          other.flagType == this.flagType &&
          other.severity == this.severity &&
          other.value == this.value &&
          other.baseline == this.baseline &&
          other.synced == this.synced &&
          other.createdAt == this.createdAt);
}

class BehaviouralFlagsCompanion extends UpdateCompanion<BehaviouralFlag> {
  final Value<int> id;
  final Value<String> memberId;
  final Value<String> flagDate;
  final Value<String> flagType;
  final Value<String> severity;
  final Value<double> value;
  final Value<double> baseline;
  final Value<bool> synced;
  final Value<DateTime> createdAt;
  const BehaviouralFlagsCompanion({
    this.id = const Value.absent(),
    this.memberId = const Value.absent(),
    this.flagDate = const Value.absent(),
    this.flagType = const Value.absent(),
    this.severity = const Value.absent(),
    this.value = const Value.absent(),
    this.baseline = const Value.absent(),
    this.synced = const Value.absent(),
    this.createdAt = const Value.absent(),
  });
  BehaviouralFlagsCompanion.insert({
    this.id = const Value.absent(),
    required String memberId,
    required String flagDate,
    required String flagType,
    required String severity,
    required double value,
    required double baseline,
    this.synced = const Value.absent(),
    this.createdAt = const Value.absent(),
  }) : memberId = Value(memberId),
       flagDate = Value(flagDate),
       flagType = Value(flagType),
       severity = Value(severity),
       value = Value(value),
       baseline = Value(baseline);
  static Insertable<BehaviouralFlag> custom({
    Expression<int>? id,
    Expression<String>? memberId,
    Expression<String>? flagDate,
    Expression<String>? flagType,
    Expression<String>? severity,
    Expression<double>? value,
    Expression<double>? baseline,
    Expression<bool>? synced,
    Expression<DateTime>? createdAt,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (memberId != null) 'member_id': memberId,
      if (flagDate != null) 'flag_date': flagDate,
      if (flagType != null) 'flag_type': flagType,
      if (severity != null) 'severity': severity,
      if (value != null) 'value': value,
      if (baseline != null) 'baseline': baseline,
      if (synced != null) 'synced': synced,
      if (createdAt != null) 'created_at': createdAt,
    });
  }

  BehaviouralFlagsCompanion copyWith({
    Value<int>? id,
    Value<String>? memberId,
    Value<String>? flagDate,
    Value<String>? flagType,
    Value<String>? severity,
    Value<double>? value,
    Value<double>? baseline,
    Value<bool>? synced,
    Value<DateTime>? createdAt,
  }) {
    return BehaviouralFlagsCompanion(
      id: id ?? this.id,
      memberId: memberId ?? this.memberId,
      flagDate: flagDate ?? this.flagDate,
      flagType: flagType ?? this.flagType,
      severity: severity ?? this.severity,
      value: value ?? this.value,
      baseline: baseline ?? this.baseline,
      synced: synced ?? this.synced,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (memberId.present) {
      map['member_id'] = Variable<String>(memberId.value);
    }
    if (flagDate.present) {
      map['flag_date'] = Variable<String>(flagDate.value);
    }
    if (flagType.present) {
      map['flag_type'] = Variable<String>(flagType.value);
    }
    if (severity.present) {
      map['severity'] = Variable<String>(severity.value);
    }
    if (value.present) {
      map['value'] = Variable<double>(value.value);
    }
    if (baseline.present) {
      map['baseline'] = Variable<double>(baseline.value);
    }
    if (synced.present) {
      map['synced'] = Variable<bool>(synced.value);
    }
    if (createdAt.present) {
      map['created_at'] = Variable<DateTime>(createdAt.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('BehaviouralFlagsCompanion(')
          ..write('id: $id, ')
          ..write('memberId: $memberId, ')
          ..write('flagDate: $flagDate, ')
          ..write('flagType: $flagType, ')
          ..write('severity: $severity, ')
          ..write('value: $value, ')
          ..write('baseline: $baseline, ')
          ..write('synced: $synced, ')
          ..write('createdAt: $createdAt')
          ..write(')'))
        .toString();
  }
}

class $ServiceHeartbeatsTable extends ServiceHeartbeats
    with TableInfo<$ServiceHeartbeatsTable, ServiceHeartbeat> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $ServiceHeartbeatsTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _timestampMeta = const VerificationMeta(
    'timestamp',
  );
  @override
  late final GeneratedColumn<DateTime> timestamp = GeneratedColumn<DateTime>(
    'timestamp',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _platformMeta = const VerificationMeta(
    'platform',
  );
  @override
  late final GeneratedColumn<String> platform = GeneratedColumn<String>(
    'platform',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _triggerSourceMeta = const VerificationMeta(
    'triggerSource',
  );
  @override
  late final GeneratedColumn<String> triggerSource = GeneratedColumn<String>(
    'trigger_source',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _stepsCapturedMeta = const VerificationMeta(
    'stepsCaptured',
  );
  @override
  late final GeneratedColumn<int> stepsCaptured = GeneratedColumn<int>(
    'steps_captured',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultValue: const Constant(0),
  );
  static const VerificationMeta _syncedMeta = const VerificationMeta('synced');
  @override
  late final GeneratedColumn<bool> synced = GeneratedColumn<bool>(
    'synced',
    aliasedName,
    false,
    type: DriftSqlType.bool,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'CHECK ("synced" IN (0, 1))',
    ),
    defaultValue: const Constant(false),
  );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    timestamp,
    platform,
    triggerSource,
    stepsCaptured,
    synced,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'service_heartbeats';
  @override
  VerificationContext validateIntegrity(
    Insertable<ServiceHeartbeat> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('timestamp')) {
      context.handle(
        _timestampMeta,
        timestamp.isAcceptableOrUnknown(data['timestamp']!, _timestampMeta),
      );
    } else if (isInserting) {
      context.missing(_timestampMeta);
    }
    if (data.containsKey('platform')) {
      context.handle(
        _platformMeta,
        platform.isAcceptableOrUnknown(data['platform']!, _platformMeta),
      );
    } else if (isInserting) {
      context.missing(_platformMeta);
    }
    if (data.containsKey('trigger_source')) {
      context.handle(
        _triggerSourceMeta,
        triggerSource.isAcceptableOrUnknown(
          data['trigger_source']!,
          _triggerSourceMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_triggerSourceMeta);
    }
    if (data.containsKey('steps_captured')) {
      context.handle(
        _stepsCapturedMeta,
        stepsCaptured.isAcceptableOrUnknown(
          data['steps_captured']!,
          _stepsCapturedMeta,
        ),
      );
    }
    if (data.containsKey('synced')) {
      context.handle(
        _syncedMeta,
        synced.isAcceptableOrUnknown(data['synced']!, _syncedMeta),
      );
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  ServiceHeartbeat map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return ServiceHeartbeat(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      timestamp: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}timestamp'],
      )!,
      platform: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}platform'],
      )!,
      triggerSource: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}trigger_source'],
      )!,
      stepsCaptured: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}steps_captured'],
      )!,
      synced: attachedDatabase.typeMapping.read(
        DriftSqlType.bool,
        data['${effectivePrefix}synced'],
      )!,
    );
  }

  @override
  $ServiceHeartbeatsTable createAlias(String alias) {
    return $ServiceHeartbeatsTable(attachedDatabase, alias);
  }
}

class ServiceHeartbeat extends DataClass
    implements Insertable<ServiceHeartbeat> {
  final int id;
  final DateTime timestamp;
  final String platform;
  final String triggerSource;
  final int stepsCaptured;
  final bool synced;
  const ServiceHeartbeat({
    required this.id,
    required this.timestamp,
    required this.platform,
    required this.triggerSource,
    required this.stepsCaptured,
    required this.synced,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['timestamp'] = Variable<DateTime>(timestamp);
    map['platform'] = Variable<String>(platform);
    map['trigger_source'] = Variable<String>(triggerSource);
    map['steps_captured'] = Variable<int>(stepsCaptured);
    map['synced'] = Variable<bool>(synced);
    return map;
  }

  ServiceHeartbeatsCompanion toCompanion(bool nullToAbsent) {
    return ServiceHeartbeatsCompanion(
      id: Value(id),
      timestamp: Value(timestamp),
      platform: Value(platform),
      triggerSource: Value(triggerSource),
      stepsCaptured: Value(stepsCaptured),
      synced: Value(synced),
    );
  }

  factory ServiceHeartbeat.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return ServiceHeartbeat(
      id: serializer.fromJson<int>(json['id']),
      timestamp: serializer.fromJson<DateTime>(json['timestamp']),
      platform: serializer.fromJson<String>(json['platform']),
      triggerSource: serializer.fromJson<String>(json['triggerSource']),
      stepsCaptured: serializer.fromJson<int>(json['stepsCaptured']),
      synced: serializer.fromJson<bool>(json['synced']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'timestamp': serializer.toJson<DateTime>(timestamp),
      'platform': serializer.toJson<String>(platform),
      'triggerSource': serializer.toJson<String>(triggerSource),
      'stepsCaptured': serializer.toJson<int>(stepsCaptured),
      'synced': serializer.toJson<bool>(synced),
    };
  }

  ServiceHeartbeat copyWith({
    int? id,
    DateTime? timestamp,
    String? platform,
    String? triggerSource,
    int? stepsCaptured,
    bool? synced,
  }) => ServiceHeartbeat(
    id: id ?? this.id,
    timestamp: timestamp ?? this.timestamp,
    platform: platform ?? this.platform,
    triggerSource: triggerSource ?? this.triggerSource,
    stepsCaptured: stepsCaptured ?? this.stepsCaptured,
    synced: synced ?? this.synced,
  );
  ServiceHeartbeat copyWithCompanion(ServiceHeartbeatsCompanion data) {
    return ServiceHeartbeat(
      id: data.id.present ? data.id.value : this.id,
      timestamp: data.timestamp.present ? data.timestamp.value : this.timestamp,
      platform: data.platform.present ? data.platform.value : this.platform,
      triggerSource: data.triggerSource.present
          ? data.triggerSource.value
          : this.triggerSource,
      stepsCaptured: data.stepsCaptured.present
          ? data.stepsCaptured.value
          : this.stepsCaptured,
      synced: data.synced.present ? data.synced.value : this.synced,
    );
  }

  @override
  String toString() {
    return (StringBuffer('ServiceHeartbeat(')
          ..write('id: $id, ')
          ..write('timestamp: $timestamp, ')
          ..write('platform: $platform, ')
          ..write('triggerSource: $triggerSource, ')
          ..write('stepsCaptured: $stepsCaptured, ')
          ..write('synced: $synced')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
    id,
    timestamp,
    platform,
    triggerSource,
    stepsCaptured,
    synced,
  );
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is ServiceHeartbeat &&
          other.id == this.id &&
          other.timestamp == this.timestamp &&
          other.platform == this.platform &&
          other.triggerSource == this.triggerSource &&
          other.stepsCaptured == this.stepsCaptured &&
          other.synced == this.synced);
}

class ServiceHeartbeatsCompanion extends UpdateCompanion<ServiceHeartbeat> {
  final Value<int> id;
  final Value<DateTime> timestamp;
  final Value<String> platform;
  final Value<String> triggerSource;
  final Value<int> stepsCaptured;
  final Value<bool> synced;
  const ServiceHeartbeatsCompanion({
    this.id = const Value.absent(),
    this.timestamp = const Value.absent(),
    this.platform = const Value.absent(),
    this.triggerSource = const Value.absent(),
    this.stepsCaptured = const Value.absent(),
    this.synced = const Value.absent(),
  });
  ServiceHeartbeatsCompanion.insert({
    this.id = const Value.absent(),
    required DateTime timestamp,
    required String platform,
    required String triggerSource,
    this.stepsCaptured = const Value.absent(),
    this.synced = const Value.absent(),
  }) : timestamp = Value(timestamp),
       platform = Value(platform),
       triggerSource = Value(triggerSource);
  static Insertable<ServiceHeartbeat> custom({
    Expression<int>? id,
    Expression<DateTime>? timestamp,
    Expression<String>? platform,
    Expression<String>? triggerSource,
    Expression<int>? stepsCaptured,
    Expression<bool>? synced,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (timestamp != null) 'timestamp': timestamp,
      if (platform != null) 'platform': platform,
      if (triggerSource != null) 'trigger_source': triggerSource,
      if (stepsCaptured != null) 'steps_captured': stepsCaptured,
      if (synced != null) 'synced': synced,
    });
  }

  ServiceHeartbeatsCompanion copyWith({
    Value<int>? id,
    Value<DateTime>? timestamp,
    Value<String>? platform,
    Value<String>? triggerSource,
    Value<int>? stepsCaptured,
    Value<bool>? synced,
  }) {
    return ServiceHeartbeatsCompanion(
      id: id ?? this.id,
      timestamp: timestamp ?? this.timestamp,
      platform: platform ?? this.platform,
      triggerSource: triggerSource ?? this.triggerSource,
      stepsCaptured: stepsCaptured ?? this.stepsCaptured,
      synced: synced ?? this.synced,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (timestamp.present) {
      map['timestamp'] = Variable<DateTime>(timestamp.value);
    }
    if (platform.present) {
      map['platform'] = Variable<String>(platform.value);
    }
    if (triggerSource.present) {
      map['trigger_source'] = Variable<String>(triggerSource.value);
    }
    if (stepsCaptured.present) {
      map['steps_captured'] = Variable<int>(stepsCaptured.value);
    }
    if (synced.present) {
      map['synced'] = Variable<bool>(synced.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('ServiceHeartbeatsCompanion(')
          ..write('id: $id, ')
          ..write('timestamp: $timestamp, ')
          ..write('platform: $platform, ')
          ..write('triggerSource: $triggerSource, ')
          ..write('stepsCaptured: $stepsCaptured, ')
          ..write('synced: $synced')
          ..write(')'))
        .toString();
  }
}

class $DataGapsTable extends DataGaps with TableInfo<$DataGapsTable, DataGap> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $DataGapsTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _memberIdMeta = const VerificationMeta(
    'memberId',
  );
  @override
  late final GeneratedColumn<String> memberId = GeneratedColumn<String>(
    'member_id',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _gapDateMeta = const VerificationMeta(
    'gapDate',
  );
  @override
  late final GeneratedColumn<String> gapDate = GeneratedColumn<String>(
    'gap_date',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _gapStartHourMeta = const VerificationMeta(
    'gapStartHour',
  );
  @override
  late final GeneratedColumn<int> gapStartHour = GeneratedColumn<int>(
    'gap_start_hour',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _gapEndHourMeta = const VerificationMeta(
    'gapEndHour',
  );
  @override
  late final GeneratedColumn<int> gapEndHour = GeneratedColumn<int>(
    'gap_end_hour',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _gapDurationMinutesMeta =
      const VerificationMeta('gapDurationMinutes');
  @override
  late final GeneratedColumn<int> gapDurationMinutes = GeneratedColumn<int>(
    'gap_duration_minutes',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _detectedAtMeta = const VerificationMeta(
    'detectedAt',
  );
  @override
  late final GeneratedColumn<DateTime> detectedAt = GeneratedColumn<DateTime>(
    'detected_at',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    memberId,
    gapDate,
    gapStartHour,
    gapEndHour,
    gapDurationMinutes,
    detectedAt,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'data_gaps';
  @override
  VerificationContext validateIntegrity(
    Insertable<DataGap> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('member_id')) {
      context.handle(
        _memberIdMeta,
        memberId.isAcceptableOrUnknown(data['member_id']!, _memberIdMeta),
      );
    } else if (isInserting) {
      context.missing(_memberIdMeta);
    }
    if (data.containsKey('gap_date')) {
      context.handle(
        _gapDateMeta,
        gapDate.isAcceptableOrUnknown(data['gap_date']!, _gapDateMeta),
      );
    } else if (isInserting) {
      context.missing(_gapDateMeta);
    }
    if (data.containsKey('gap_start_hour')) {
      context.handle(
        _gapStartHourMeta,
        gapStartHour.isAcceptableOrUnknown(
          data['gap_start_hour']!,
          _gapStartHourMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_gapStartHourMeta);
    }
    if (data.containsKey('gap_end_hour')) {
      context.handle(
        _gapEndHourMeta,
        gapEndHour.isAcceptableOrUnknown(
          data['gap_end_hour']!,
          _gapEndHourMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_gapEndHourMeta);
    }
    if (data.containsKey('gap_duration_minutes')) {
      context.handle(
        _gapDurationMinutesMeta,
        gapDurationMinutes.isAcceptableOrUnknown(
          data['gap_duration_minutes']!,
          _gapDurationMinutesMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_gapDurationMinutesMeta);
    }
    if (data.containsKey('detected_at')) {
      context.handle(
        _detectedAtMeta,
        detectedAt.isAcceptableOrUnknown(data['detected_at']!, _detectedAtMeta),
      );
    } else if (isInserting) {
      context.missing(_detectedAtMeta);
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  DataGap map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return DataGap(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      memberId: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}member_id'],
      )!,
      gapDate: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}gap_date'],
      )!,
      gapStartHour: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}gap_start_hour'],
      )!,
      gapEndHour: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}gap_end_hour'],
      )!,
      gapDurationMinutes: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}gap_duration_minutes'],
      )!,
      detectedAt: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}detected_at'],
      )!,
    );
  }

  @override
  $DataGapsTable createAlias(String alias) {
    return $DataGapsTable(attachedDatabase, alias);
  }
}

class DataGap extends DataClass implements Insertable<DataGap> {
  final int id;
  final String memberId;
  final String gapDate;
  final int gapStartHour;
  final int gapEndHour;
  final int gapDurationMinutes;
  final DateTime detectedAt;
  const DataGap({
    required this.id,
    required this.memberId,
    required this.gapDate,
    required this.gapStartHour,
    required this.gapEndHour,
    required this.gapDurationMinutes,
    required this.detectedAt,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['member_id'] = Variable<String>(memberId);
    map['gap_date'] = Variable<String>(gapDate);
    map['gap_start_hour'] = Variable<int>(gapStartHour);
    map['gap_end_hour'] = Variable<int>(gapEndHour);
    map['gap_duration_minutes'] = Variable<int>(gapDurationMinutes);
    map['detected_at'] = Variable<DateTime>(detectedAt);
    return map;
  }

  DataGapsCompanion toCompanion(bool nullToAbsent) {
    return DataGapsCompanion(
      id: Value(id),
      memberId: Value(memberId),
      gapDate: Value(gapDate),
      gapStartHour: Value(gapStartHour),
      gapEndHour: Value(gapEndHour),
      gapDurationMinutes: Value(gapDurationMinutes),
      detectedAt: Value(detectedAt),
    );
  }

  factory DataGap.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return DataGap(
      id: serializer.fromJson<int>(json['id']),
      memberId: serializer.fromJson<String>(json['memberId']),
      gapDate: serializer.fromJson<String>(json['gapDate']),
      gapStartHour: serializer.fromJson<int>(json['gapStartHour']),
      gapEndHour: serializer.fromJson<int>(json['gapEndHour']),
      gapDurationMinutes: serializer.fromJson<int>(json['gapDurationMinutes']),
      detectedAt: serializer.fromJson<DateTime>(json['detectedAt']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'memberId': serializer.toJson<String>(memberId),
      'gapDate': serializer.toJson<String>(gapDate),
      'gapStartHour': serializer.toJson<int>(gapStartHour),
      'gapEndHour': serializer.toJson<int>(gapEndHour),
      'gapDurationMinutes': serializer.toJson<int>(gapDurationMinutes),
      'detectedAt': serializer.toJson<DateTime>(detectedAt),
    };
  }

  DataGap copyWith({
    int? id,
    String? memberId,
    String? gapDate,
    int? gapStartHour,
    int? gapEndHour,
    int? gapDurationMinutes,
    DateTime? detectedAt,
  }) => DataGap(
    id: id ?? this.id,
    memberId: memberId ?? this.memberId,
    gapDate: gapDate ?? this.gapDate,
    gapStartHour: gapStartHour ?? this.gapStartHour,
    gapEndHour: gapEndHour ?? this.gapEndHour,
    gapDurationMinutes: gapDurationMinutes ?? this.gapDurationMinutes,
    detectedAt: detectedAt ?? this.detectedAt,
  );
  DataGap copyWithCompanion(DataGapsCompanion data) {
    return DataGap(
      id: data.id.present ? data.id.value : this.id,
      memberId: data.memberId.present ? data.memberId.value : this.memberId,
      gapDate: data.gapDate.present ? data.gapDate.value : this.gapDate,
      gapStartHour: data.gapStartHour.present
          ? data.gapStartHour.value
          : this.gapStartHour,
      gapEndHour: data.gapEndHour.present
          ? data.gapEndHour.value
          : this.gapEndHour,
      gapDurationMinutes: data.gapDurationMinutes.present
          ? data.gapDurationMinutes.value
          : this.gapDurationMinutes,
      detectedAt: data.detectedAt.present
          ? data.detectedAt.value
          : this.detectedAt,
    );
  }

  @override
  String toString() {
    return (StringBuffer('DataGap(')
          ..write('id: $id, ')
          ..write('memberId: $memberId, ')
          ..write('gapDate: $gapDate, ')
          ..write('gapStartHour: $gapStartHour, ')
          ..write('gapEndHour: $gapEndHour, ')
          ..write('gapDurationMinutes: $gapDurationMinutes, ')
          ..write('detectedAt: $detectedAt')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
    id,
    memberId,
    gapDate,
    gapStartHour,
    gapEndHour,
    gapDurationMinutes,
    detectedAt,
  );
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is DataGap &&
          other.id == this.id &&
          other.memberId == this.memberId &&
          other.gapDate == this.gapDate &&
          other.gapStartHour == this.gapStartHour &&
          other.gapEndHour == this.gapEndHour &&
          other.gapDurationMinutes == this.gapDurationMinutes &&
          other.detectedAt == this.detectedAt);
}

class DataGapsCompanion extends UpdateCompanion<DataGap> {
  final Value<int> id;
  final Value<String> memberId;
  final Value<String> gapDate;
  final Value<int> gapStartHour;
  final Value<int> gapEndHour;
  final Value<int> gapDurationMinutes;
  final Value<DateTime> detectedAt;
  const DataGapsCompanion({
    this.id = const Value.absent(),
    this.memberId = const Value.absent(),
    this.gapDate = const Value.absent(),
    this.gapStartHour = const Value.absent(),
    this.gapEndHour = const Value.absent(),
    this.gapDurationMinutes = const Value.absent(),
    this.detectedAt = const Value.absent(),
  });
  DataGapsCompanion.insert({
    this.id = const Value.absent(),
    required String memberId,
    required String gapDate,
    required int gapStartHour,
    required int gapEndHour,
    required int gapDurationMinutes,
    required DateTime detectedAt,
  }) : memberId = Value(memberId),
       gapDate = Value(gapDate),
       gapStartHour = Value(gapStartHour),
       gapEndHour = Value(gapEndHour),
       gapDurationMinutes = Value(gapDurationMinutes),
       detectedAt = Value(detectedAt);
  static Insertable<DataGap> custom({
    Expression<int>? id,
    Expression<String>? memberId,
    Expression<String>? gapDate,
    Expression<int>? gapStartHour,
    Expression<int>? gapEndHour,
    Expression<int>? gapDurationMinutes,
    Expression<DateTime>? detectedAt,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (memberId != null) 'member_id': memberId,
      if (gapDate != null) 'gap_date': gapDate,
      if (gapStartHour != null) 'gap_start_hour': gapStartHour,
      if (gapEndHour != null) 'gap_end_hour': gapEndHour,
      if (gapDurationMinutes != null)
        'gap_duration_minutes': gapDurationMinutes,
      if (detectedAt != null) 'detected_at': detectedAt,
    });
  }

  DataGapsCompanion copyWith({
    Value<int>? id,
    Value<String>? memberId,
    Value<String>? gapDate,
    Value<int>? gapStartHour,
    Value<int>? gapEndHour,
    Value<int>? gapDurationMinutes,
    Value<DateTime>? detectedAt,
  }) {
    return DataGapsCompanion(
      id: id ?? this.id,
      memberId: memberId ?? this.memberId,
      gapDate: gapDate ?? this.gapDate,
      gapStartHour: gapStartHour ?? this.gapStartHour,
      gapEndHour: gapEndHour ?? this.gapEndHour,
      gapDurationMinutes: gapDurationMinutes ?? this.gapDurationMinutes,
      detectedAt: detectedAt ?? this.detectedAt,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (memberId.present) {
      map['member_id'] = Variable<String>(memberId.value);
    }
    if (gapDate.present) {
      map['gap_date'] = Variable<String>(gapDate.value);
    }
    if (gapStartHour.present) {
      map['gap_start_hour'] = Variable<int>(gapStartHour.value);
    }
    if (gapEndHour.present) {
      map['gap_end_hour'] = Variable<int>(gapEndHour.value);
    }
    if (gapDurationMinutes.present) {
      map['gap_duration_minutes'] = Variable<int>(gapDurationMinutes.value);
    }
    if (detectedAt.present) {
      map['detected_at'] = Variable<DateTime>(detectedAt.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('DataGapsCompanion(')
          ..write('id: $id, ')
          ..write('memberId: $memberId, ')
          ..write('gapDate: $gapDate, ')
          ..write('gapStartHour: $gapStartHour, ')
          ..write('gapEndHour: $gapEndHour, ')
          ..write('gapDurationMinutes: $gapDurationMinutes, ')
          ..write('detectedAt: $detectedAt')
          ..write(')'))
        .toString();
  }
}

class $LocationLogsTable extends LocationLogs
    with TableInfo<$LocationLogsTable, LocationLog> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $LocationLogsTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _timestampMeta = const VerificationMeta(
    'timestamp',
  );
  @override
  late final GeneratedColumn<DateTime> timestamp = GeneratedColumn<DateTime>(
    'timestamp',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _latitudeMeta = const VerificationMeta(
    'latitude',
  );
  @override
  late final GeneratedColumn<double> latitude = GeneratedColumn<double>(
    'latitude',
    aliasedName,
    false,
    type: DriftSqlType.double,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _longitudeMeta = const VerificationMeta(
    'longitude',
  );
  @override
  late final GeneratedColumn<double> longitude = GeneratedColumn<double>(
    'longitude',
    aliasedName,
    false,
    type: DriftSqlType.double,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _accuracyMetersMeta = const VerificationMeta(
    'accuracyMeters',
  );
  @override
  late final GeneratedColumn<double> accuracyMeters = GeneratedColumn<double>(
    'accuracy_meters',
    aliasedName,
    false,
    type: DriftSqlType.double,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _altitudeMetersMeta = const VerificationMeta(
    'altitudeMeters',
  );
  @override
  late final GeneratedColumn<double> altitudeMeters = GeneratedColumn<double>(
    'altitude_meters',
    aliasedName,
    true,
    type: DriftSqlType.double,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _speedMsMeta = const VerificationMeta(
    'speedMs',
  );
  @override
  late final GeneratedColumn<double> speedMs = GeneratedColumn<double>(
    'speed_ms',
    aliasedName,
    true,
    type: DriftSqlType.double,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _eventMeta = const VerificationMeta('event');
  @override
  late final GeneratedColumn<String> event = GeneratedColumn<String>(
    'event',
    aliasedName,
    true,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _syncedMeta = const VerificationMeta('synced');
  @override
  late final GeneratedColumn<bool> synced = GeneratedColumn<bool>(
    'synced',
    aliasedName,
    false,
    type: DriftSqlType.bool,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'CHECK ("synced" IN (0, 1))',
    ),
    defaultValue: const Constant(false),
  );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    timestamp,
    latitude,
    longitude,
    accuracyMeters,
    altitudeMeters,
    speedMs,
    event,
    synced,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'location_logs';
  @override
  VerificationContext validateIntegrity(
    Insertable<LocationLog> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('timestamp')) {
      context.handle(
        _timestampMeta,
        timestamp.isAcceptableOrUnknown(data['timestamp']!, _timestampMeta),
      );
    } else if (isInserting) {
      context.missing(_timestampMeta);
    }
    if (data.containsKey('latitude')) {
      context.handle(
        _latitudeMeta,
        latitude.isAcceptableOrUnknown(data['latitude']!, _latitudeMeta),
      );
    } else if (isInserting) {
      context.missing(_latitudeMeta);
    }
    if (data.containsKey('longitude')) {
      context.handle(
        _longitudeMeta,
        longitude.isAcceptableOrUnknown(data['longitude']!, _longitudeMeta),
      );
    } else if (isInserting) {
      context.missing(_longitudeMeta);
    }
    if (data.containsKey('accuracy_meters')) {
      context.handle(
        _accuracyMetersMeta,
        accuracyMeters.isAcceptableOrUnknown(
          data['accuracy_meters']!,
          _accuracyMetersMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_accuracyMetersMeta);
    }
    if (data.containsKey('altitude_meters')) {
      context.handle(
        _altitudeMetersMeta,
        altitudeMeters.isAcceptableOrUnknown(
          data['altitude_meters']!,
          _altitudeMetersMeta,
        ),
      );
    }
    if (data.containsKey('speed_ms')) {
      context.handle(
        _speedMsMeta,
        speedMs.isAcceptableOrUnknown(data['speed_ms']!, _speedMsMeta),
      );
    }
    if (data.containsKey('event')) {
      context.handle(
        _eventMeta,
        event.isAcceptableOrUnknown(data['event']!, _eventMeta),
      );
    }
    if (data.containsKey('synced')) {
      context.handle(
        _syncedMeta,
        synced.isAcceptableOrUnknown(data['synced']!, _syncedMeta),
      );
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  LocationLog map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return LocationLog(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      timestamp: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}timestamp'],
      )!,
      latitude: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}latitude'],
      )!,
      longitude: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}longitude'],
      )!,
      accuracyMeters: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}accuracy_meters'],
      )!,
      altitudeMeters: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}altitude_meters'],
      ),
      speedMs: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}speed_ms'],
      ),
      event: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}event'],
      ),
      synced: attachedDatabase.typeMapping.read(
        DriftSqlType.bool,
        data['${effectivePrefix}synced'],
      )!,
    );
  }

  @override
  $LocationLogsTable createAlias(String alias) {
    return $LocationLogsTable(attachedDatabase, alias);
  }
}

class LocationLog extends DataClass implements Insertable<LocationLog> {
  final int id;
  final DateTime timestamp;
  final double latitude;
  final double longitude;
  final double accuracyMeters;
  final double? altitudeMeters;
  final double? speedMs;

  /// null = routine log, 'left_home' = departure event, 'arrived_home' = arrival event
  final String? event;
  final bool synced;
  const LocationLog({
    required this.id,
    required this.timestamp,
    required this.latitude,
    required this.longitude,
    required this.accuracyMeters,
    this.altitudeMeters,
    this.speedMs,
    this.event,
    required this.synced,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['timestamp'] = Variable<DateTime>(timestamp);
    map['latitude'] = Variable<double>(latitude);
    map['longitude'] = Variable<double>(longitude);
    map['accuracy_meters'] = Variable<double>(accuracyMeters);
    if (!nullToAbsent || altitudeMeters != null) {
      map['altitude_meters'] = Variable<double>(altitudeMeters);
    }
    if (!nullToAbsent || speedMs != null) {
      map['speed_ms'] = Variable<double>(speedMs);
    }
    if (!nullToAbsent || event != null) {
      map['event'] = Variable<String>(event);
    }
    map['synced'] = Variable<bool>(synced);
    return map;
  }

  LocationLogsCompanion toCompanion(bool nullToAbsent) {
    return LocationLogsCompanion(
      id: Value(id),
      timestamp: Value(timestamp),
      latitude: Value(latitude),
      longitude: Value(longitude),
      accuracyMeters: Value(accuracyMeters),
      altitudeMeters: altitudeMeters == null && nullToAbsent
          ? const Value.absent()
          : Value(altitudeMeters),
      speedMs: speedMs == null && nullToAbsent
          ? const Value.absent()
          : Value(speedMs),
      event: event == null && nullToAbsent
          ? const Value.absent()
          : Value(event),
      synced: Value(synced),
    );
  }

  factory LocationLog.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return LocationLog(
      id: serializer.fromJson<int>(json['id']),
      timestamp: serializer.fromJson<DateTime>(json['timestamp']),
      latitude: serializer.fromJson<double>(json['latitude']),
      longitude: serializer.fromJson<double>(json['longitude']),
      accuracyMeters: serializer.fromJson<double>(json['accuracyMeters']),
      altitudeMeters: serializer.fromJson<double?>(json['altitudeMeters']),
      speedMs: serializer.fromJson<double?>(json['speedMs']),
      event: serializer.fromJson<String?>(json['event']),
      synced: serializer.fromJson<bool>(json['synced']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'timestamp': serializer.toJson<DateTime>(timestamp),
      'latitude': serializer.toJson<double>(latitude),
      'longitude': serializer.toJson<double>(longitude),
      'accuracyMeters': serializer.toJson<double>(accuracyMeters),
      'altitudeMeters': serializer.toJson<double?>(altitudeMeters),
      'speedMs': serializer.toJson<double?>(speedMs),
      'event': serializer.toJson<String?>(event),
      'synced': serializer.toJson<bool>(synced),
    };
  }

  LocationLog copyWith({
    int? id,
    DateTime? timestamp,
    double? latitude,
    double? longitude,
    double? accuracyMeters,
    Value<double?> altitudeMeters = const Value.absent(),
    Value<double?> speedMs = const Value.absent(),
    Value<String?> event = const Value.absent(),
    bool? synced,
  }) => LocationLog(
    id: id ?? this.id,
    timestamp: timestamp ?? this.timestamp,
    latitude: latitude ?? this.latitude,
    longitude: longitude ?? this.longitude,
    accuracyMeters: accuracyMeters ?? this.accuracyMeters,
    altitudeMeters: altitudeMeters.present
        ? altitudeMeters.value
        : this.altitudeMeters,
    speedMs: speedMs.present ? speedMs.value : this.speedMs,
    event: event.present ? event.value : this.event,
    synced: synced ?? this.synced,
  );
  LocationLog copyWithCompanion(LocationLogsCompanion data) {
    return LocationLog(
      id: data.id.present ? data.id.value : this.id,
      timestamp: data.timestamp.present ? data.timestamp.value : this.timestamp,
      latitude: data.latitude.present ? data.latitude.value : this.latitude,
      longitude: data.longitude.present ? data.longitude.value : this.longitude,
      accuracyMeters: data.accuracyMeters.present
          ? data.accuracyMeters.value
          : this.accuracyMeters,
      altitudeMeters: data.altitudeMeters.present
          ? data.altitudeMeters.value
          : this.altitudeMeters,
      speedMs: data.speedMs.present ? data.speedMs.value : this.speedMs,
      event: data.event.present ? data.event.value : this.event,
      synced: data.synced.present ? data.synced.value : this.synced,
    );
  }

  @override
  String toString() {
    return (StringBuffer('LocationLog(')
          ..write('id: $id, ')
          ..write('timestamp: $timestamp, ')
          ..write('latitude: $latitude, ')
          ..write('longitude: $longitude, ')
          ..write('accuracyMeters: $accuracyMeters, ')
          ..write('altitudeMeters: $altitudeMeters, ')
          ..write('speedMs: $speedMs, ')
          ..write('event: $event, ')
          ..write('synced: $synced')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
    id,
    timestamp,
    latitude,
    longitude,
    accuracyMeters,
    altitudeMeters,
    speedMs,
    event,
    synced,
  );
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is LocationLog &&
          other.id == this.id &&
          other.timestamp == this.timestamp &&
          other.latitude == this.latitude &&
          other.longitude == this.longitude &&
          other.accuracyMeters == this.accuracyMeters &&
          other.altitudeMeters == this.altitudeMeters &&
          other.speedMs == this.speedMs &&
          other.event == this.event &&
          other.synced == this.synced);
}

class LocationLogsCompanion extends UpdateCompanion<LocationLog> {
  final Value<int> id;
  final Value<DateTime> timestamp;
  final Value<double> latitude;
  final Value<double> longitude;
  final Value<double> accuracyMeters;
  final Value<double?> altitudeMeters;
  final Value<double?> speedMs;
  final Value<String?> event;
  final Value<bool> synced;
  const LocationLogsCompanion({
    this.id = const Value.absent(),
    this.timestamp = const Value.absent(),
    this.latitude = const Value.absent(),
    this.longitude = const Value.absent(),
    this.accuracyMeters = const Value.absent(),
    this.altitudeMeters = const Value.absent(),
    this.speedMs = const Value.absent(),
    this.event = const Value.absent(),
    this.synced = const Value.absent(),
  });
  LocationLogsCompanion.insert({
    this.id = const Value.absent(),
    required DateTime timestamp,
    required double latitude,
    required double longitude,
    required double accuracyMeters,
    this.altitudeMeters = const Value.absent(),
    this.speedMs = const Value.absent(),
    this.event = const Value.absent(),
    this.synced = const Value.absent(),
  }) : timestamp = Value(timestamp),
       latitude = Value(latitude),
       longitude = Value(longitude),
       accuracyMeters = Value(accuracyMeters);
  static Insertable<LocationLog> custom({
    Expression<int>? id,
    Expression<DateTime>? timestamp,
    Expression<double>? latitude,
    Expression<double>? longitude,
    Expression<double>? accuracyMeters,
    Expression<double>? altitudeMeters,
    Expression<double>? speedMs,
    Expression<String>? event,
    Expression<bool>? synced,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (timestamp != null) 'timestamp': timestamp,
      if (latitude != null) 'latitude': latitude,
      if (longitude != null) 'longitude': longitude,
      if (accuracyMeters != null) 'accuracy_meters': accuracyMeters,
      if (altitudeMeters != null) 'altitude_meters': altitudeMeters,
      if (speedMs != null) 'speed_ms': speedMs,
      if (event != null) 'event': event,
      if (synced != null) 'synced': synced,
    });
  }

  LocationLogsCompanion copyWith({
    Value<int>? id,
    Value<DateTime>? timestamp,
    Value<double>? latitude,
    Value<double>? longitude,
    Value<double>? accuracyMeters,
    Value<double?>? altitudeMeters,
    Value<double?>? speedMs,
    Value<String?>? event,
    Value<bool>? synced,
  }) {
    return LocationLogsCompanion(
      id: id ?? this.id,
      timestamp: timestamp ?? this.timestamp,
      latitude: latitude ?? this.latitude,
      longitude: longitude ?? this.longitude,
      accuracyMeters: accuracyMeters ?? this.accuracyMeters,
      altitudeMeters: altitudeMeters ?? this.altitudeMeters,
      speedMs: speedMs ?? this.speedMs,
      event: event ?? this.event,
      synced: synced ?? this.synced,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (timestamp.present) {
      map['timestamp'] = Variable<DateTime>(timestamp.value);
    }
    if (latitude.present) {
      map['latitude'] = Variable<double>(latitude.value);
    }
    if (longitude.present) {
      map['longitude'] = Variable<double>(longitude.value);
    }
    if (accuracyMeters.present) {
      map['accuracy_meters'] = Variable<double>(accuracyMeters.value);
    }
    if (altitudeMeters.present) {
      map['altitude_meters'] = Variable<double>(altitudeMeters.value);
    }
    if (speedMs.present) {
      map['speed_ms'] = Variable<double>(speedMs.value);
    }
    if (event.present) {
      map['event'] = Variable<String>(event.value);
    }
    if (synced.present) {
      map['synced'] = Variable<bool>(synced.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('LocationLogsCompanion(')
          ..write('id: $id, ')
          ..write('timestamp: $timestamp, ')
          ..write('latitude: $latitude, ')
          ..write('longitude: $longitude, ')
          ..write('accuracyMeters: $accuracyMeters, ')
          ..write('altitudeMeters: $altitudeMeters, ')
          ..write('speedMs: $speedMs, ')
          ..write('event: $event, ')
          ..write('synced: $synced')
          ..write(')'))
        .toString();
  }
}

abstract class _$AppDatabase extends GeneratedDatabase {
  _$AppDatabase(QueryExecutor e) : super(e);
  $AppDatabaseManager get managers => $AppDatabaseManager(this);
  late final $StepHourlyRawTable stepHourlyRaw = $StepHourlyRawTable(this);
  late final $StepDailySummaryTable stepDailySummary = $StepDailySummaryTable(
    this,
  );
  late final $BehaviouralFlagsTable behaviouralFlags = $BehaviouralFlagsTable(
    this,
  );
  late final $ServiceHeartbeatsTable serviceHeartbeats =
      $ServiceHeartbeatsTable(this);
  late final $DataGapsTable dataGaps = $DataGapsTable(this);
  late final $LocationLogsTable locationLogs = $LocationLogsTable(this);
  @override
  Iterable<TableInfo<Table, Object?>> get allTables =>
      allSchemaEntities.whereType<TableInfo<Table, Object?>>();
  @override
  List<DatabaseSchemaEntity> get allSchemaEntities => [
    stepHourlyRaw,
    stepDailySummary,
    behaviouralFlags,
    serviceHeartbeats,
    dataGaps,
    locationLogs,
  ];
}

typedef $$StepHourlyRawTableCreateCompanionBuilder =
    StepHourlyRawCompanion Function({
      Value<int> id,
      required String memberId,
      required String date,
      required int hour,
      required int stepCount,
      required String source,
      required DateTime capturedAt,
      Value<bool> synced,
    });
typedef $$StepHourlyRawTableUpdateCompanionBuilder =
    StepHourlyRawCompanion Function({
      Value<int> id,
      Value<String> memberId,
      Value<String> date,
      Value<int> hour,
      Value<int> stepCount,
      Value<String> source,
      Value<DateTime> capturedAt,
      Value<bool> synced,
    });

class $$StepHourlyRawTableFilterComposer
    extends Composer<_$AppDatabase, $StepHourlyRawTable> {
  $$StepHourlyRawTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get memberId => $composableBuilder(
    column: $table.memberId,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get date => $composableBuilder(
    column: $table.date,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get hour => $composableBuilder(
    column: $table.hour,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get stepCount => $composableBuilder(
    column: $table.stepCount,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get source => $composableBuilder(
    column: $table.source,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get capturedAt => $composableBuilder(
    column: $table.capturedAt,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<bool> get synced => $composableBuilder(
    column: $table.synced,
    builder: (column) => ColumnFilters(column),
  );
}

class $$StepHourlyRawTableOrderingComposer
    extends Composer<_$AppDatabase, $StepHourlyRawTable> {
  $$StepHourlyRawTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get memberId => $composableBuilder(
    column: $table.memberId,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get date => $composableBuilder(
    column: $table.date,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get hour => $composableBuilder(
    column: $table.hour,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get stepCount => $composableBuilder(
    column: $table.stepCount,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get source => $composableBuilder(
    column: $table.source,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get capturedAt => $composableBuilder(
    column: $table.capturedAt,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<bool> get synced => $composableBuilder(
    column: $table.synced,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$StepHourlyRawTableAnnotationComposer
    extends Composer<_$AppDatabase, $StepHourlyRawTable> {
  $$StepHourlyRawTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get memberId =>
      $composableBuilder(column: $table.memberId, builder: (column) => column);

  GeneratedColumn<String> get date =>
      $composableBuilder(column: $table.date, builder: (column) => column);

  GeneratedColumn<int> get hour =>
      $composableBuilder(column: $table.hour, builder: (column) => column);

  GeneratedColumn<int> get stepCount =>
      $composableBuilder(column: $table.stepCount, builder: (column) => column);

  GeneratedColumn<String> get source =>
      $composableBuilder(column: $table.source, builder: (column) => column);

  GeneratedColumn<DateTime> get capturedAt => $composableBuilder(
    column: $table.capturedAt,
    builder: (column) => column,
  );

  GeneratedColumn<bool> get synced =>
      $composableBuilder(column: $table.synced, builder: (column) => column);
}

class $$StepHourlyRawTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $StepHourlyRawTable,
          StepHourlyRawData,
          $$StepHourlyRawTableFilterComposer,
          $$StepHourlyRawTableOrderingComposer,
          $$StepHourlyRawTableAnnotationComposer,
          $$StepHourlyRawTableCreateCompanionBuilder,
          $$StepHourlyRawTableUpdateCompanionBuilder,
          (
            StepHourlyRawData,
            BaseReferences<
              _$AppDatabase,
              $StepHourlyRawTable,
              StepHourlyRawData
            >,
          ),
          StepHourlyRawData,
          PrefetchHooks Function()
        > {
  $$StepHourlyRawTableTableManager(_$AppDatabase db, $StepHourlyRawTable table)
    : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$StepHourlyRawTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$StepHourlyRawTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$StepHourlyRawTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<String> memberId = const Value.absent(),
                Value<String> date = const Value.absent(),
                Value<int> hour = const Value.absent(),
                Value<int> stepCount = const Value.absent(),
                Value<String> source = const Value.absent(),
                Value<DateTime> capturedAt = const Value.absent(),
                Value<bool> synced = const Value.absent(),
              }) => StepHourlyRawCompanion(
                id: id,
                memberId: memberId,
                date: date,
                hour: hour,
                stepCount: stepCount,
                source: source,
                capturedAt: capturedAt,
                synced: synced,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required String memberId,
                required String date,
                required int hour,
                required int stepCount,
                required String source,
                required DateTime capturedAt,
                Value<bool> synced = const Value.absent(),
              }) => StepHourlyRawCompanion.insert(
                id: id,
                memberId: memberId,
                date: date,
                hour: hour,
                stepCount: stepCount,
                source: source,
                capturedAt: capturedAt,
                synced: synced,
              ),
          withReferenceMapper: (p0) => p0
              .map((e) => (e.readTable(table), BaseReferences(db, table, e)))
              .toList(),
          prefetchHooksCallback: null,
        ),
      );
}

typedef $$StepHourlyRawTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $StepHourlyRawTable,
      StepHourlyRawData,
      $$StepHourlyRawTableFilterComposer,
      $$StepHourlyRawTableOrderingComposer,
      $$StepHourlyRawTableAnnotationComposer,
      $$StepHourlyRawTableCreateCompanionBuilder,
      $$StepHourlyRawTableUpdateCompanionBuilder,
      (
        StepHourlyRawData,
        BaseReferences<_$AppDatabase, $StepHourlyRawTable, StepHourlyRawData>,
      ),
      StepHourlyRawData,
      PrefetchHooks Function()
    >;
typedef $$StepDailySummaryTableCreateCompanionBuilder =
    StepDailySummaryCompanion Function({
      required String memberId,
      required String date,
      required int totalSteps,
      required int activeHours,
      required int peakHour,
      required int firstActiveHour,
      required int lastActiveHour,
      required double activityWindowHours,
      required int dayOfWeek,
      Value<bool> hasWearableSleep,
      Value<int?> sleepOnsetTime,
      Value<int?> sleepOffsetTime,
      Value<int?> sleepDurationMin,
      Value<double?> sleepEfficiencyPct,
      Value<int?> wakeEpisodes,
      required DateTime computedAt,
      Value<int> rowid,
    });
typedef $$StepDailySummaryTableUpdateCompanionBuilder =
    StepDailySummaryCompanion Function({
      Value<String> memberId,
      Value<String> date,
      Value<int> totalSteps,
      Value<int> activeHours,
      Value<int> peakHour,
      Value<int> firstActiveHour,
      Value<int> lastActiveHour,
      Value<double> activityWindowHours,
      Value<int> dayOfWeek,
      Value<bool> hasWearableSleep,
      Value<int?> sleepOnsetTime,
      Value<int?> sleepOffsetTime,
      Value<int?> sleepDurationMin,
      Value<double?> sleepEfficiencyPct,
      Value<int?> wakeEpisodes,
      Value<DateTime> computedAt,
      Value<int> rowid,
    });

class $$StepDailySummaryTableFilterComposer
    extends Composer<_$AppDatabase, $StepDailySummaryTable> {
  $$StepDailySummaryTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<String> get memberId => $composableBuilder(
    column: $table.memberId,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get date => $composableBuilder(
    column: $table.date,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get totalSteps => $composableBuilder(
    column: $table.totalSteps,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get activeHours => $composableBuilder(
    column: $table.activeHours,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get peakHour => $composableBuilder(
    column: $table.peakHour,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get firstActiveHour => $composableBuilder(
    column: $table.firstActiveHour,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get lastActiveHour => $composableBuilder(
    column: $table.lastActiveHour,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get activityWindowHours => $composableBuilder(
    column: $table.activityWindowHours,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get dayOfWeek => $composableBuilder(
    column: $table.dayOfWeek,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<bool> get hasWearableSleep => $composableBuilder(
    column: $table.hasWearableSleep,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get sleepOnsetTime => $composableBuilder(
    column: $table.sleepOnsetTime,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get sleepOffsetTime => $composableBuilder(
    column: $table.sleepOffsetTime,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get sleepDurationMin => $composableBuilder(
    column: $table.sleepDurationMin,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get sleepEfficiencyPct => $composableBuilder(
    column: $table.sleepEfficiencyPct,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get wakeEpisodes => $composableBuilder(
    column: $table.wakeEpisodes,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get computedAt => $composableBuilder(
    column: $table.computedAt,
    builder: (column) => ColumnFilters(column),
  );
}

class $$StepDailySummaryTableOrderingComposer
    extends Composer<_$AppDatabase, $StepDailySummaryTable> {
  $$StepDailySummaryTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<String> get memberId => $composableBuilder(
    column: $table.memberId,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get date => $composableBuilder(
    column: $table.date,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get totalSteps => $composableBuilder(
    column: $table.totalSteps,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get activeHours => $composableBuilder(
    column: $table.activeHours,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get peakHour => $composableBuilder(
    column: $table.peakHour,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get firstActiveHour => $composableBuilder(
    column: $table.firstActiveHour,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get lastActiveHour => $composableBuilder(
    column: $table.lastActiveHour,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get activityWindowHours => $composableBuilder(
    column: $table.activityWindowHours,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get dayOfWeek => $composableBuilder(
    column: $table.dayOfWeek,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<bool> get hasWearableSleep => $composableBuilder(
    column: $table.hasWearableSleep,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get sleepOnsetTime => $composableBuilder(
    column: $table.sleepOnsetTime,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get sleepOffsetTime => $composableBuilder(
    column: $table.sleepOffsetTime,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get sleepDurationMin => $composableBuilder(
    column: $table.sleepDurationMin,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get sleepEfficiencyPct => $composableBuilder(
    column: $table.sleepEfficiencyPct,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get wakeEpisodes => $composableBuilder(
    column: $table.wakeEpisodes,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get computedAt => $composableBuilder(
    column: $table.computedAt,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$StepDailySummaryTableAnnotationComposer
    extends Composer<_$AppDatabase, $StepDailySummaryTable> {
  $$StepDailySummaryTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<String> get memberId =>
      $composableBuilder(column: $table.memberId, builder: (column) => column);

  GeneratedColumn<String> get date =>
      $composableBuilder(column: $table.date, builder: (column) => column);

  GeneratedColumn<int> get totalSteps => $composableBuilder(
    column: $table.totalSteps,
    builder: (column) => column,
  );

  GeneratedColumn<int> get activeHours => $composableBuilder(
    column: $table.activeHours,
    builder: (column) => column,
  );

  GeneratedColumn<int> get peakHour =>
      $composableBuilder(column: $table.peakHour, builder: (column) => column);

  GeneratedColumn<int> get firstActiveHour => $composableBuilder(
    column: $table.firstActiveHour,
    builder: (column) => column,
  );

  GeneratedColumn<int> get lastActiveHour => $composableBuilder(
    column: $table.lastActiveHour,
    builder: (column) => column,
  );

  GeneratedColumn<double> get activityWindowHours => $composableBuilder(
    column: $table.activityWindowHours,
    builder: (column) => column,
  );

  GeneratedColumn<int> get dayOfWeek =>
      $composableBuilder(column: $table.dayOfWeek, builder: (column) => column);

  GeneratedColumn<bool> get hasWearableSleep => $composableBuilder(
    column: $table.hasWearableSleep,
    builder: (column) => column,
  );

  GeneratedColumn<int> get sleepOnsetTime => $composableBuilder(
    column: $table.sleepOnsetTime,
    builder: (column) => column,
  );

  GeneratedColumn<int> get sleepOffsetTime => $composableBuilder(
    column: $table.sleepOffsetTime,
    builder: (column) => column,
  );

  GeneratedColumn<int> get sleepDurationMin => $composableBuilder(
    column: $table.sleepDurationMin,
    builder: (column) => column,
  );

  GeneratedColumn<double> get sleepEfficiencyPct => $composableBuilder(
    column: $table.sleepEfficiencyPct,
    builder: (column) => column,
  );

  GeneratedColumn<int> get wakeEpisodes => $composableBuilder(
    column: $table.wakeEpisodes,
    builder: (column) => column,
  );

  GeneratedColumn<DateTime> get computedAt => $composableBuilder(
    column: $table.computedAt,
    builder: (column) => column,
  );
}

class $$StepDailySummaryTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $StepDailySummaryTable,
          StepDailySummaryData,
          $$StepDailySummaryTableFilterComposer,
          $$StepDailySummaryTableOrderingComposer,
          $$StepDailySummaryTableAnnotationComposer,
          $$StepDailySummaryTableCreateCompanionBuilder,
          $$StepDailySummaryTableUpdateCompanionBuilder,
          (
            StepDailySummaryData,
            BaseReferences<
              _$AppDatabase,
              $StepDailySummaryTable,
              StepDailySummaryData
            >,
          ),
          StepDailySummaryData,
          PrefetchHooks Function()
        > {
  $$StepDailySummaryTableTableManager(
    _$AppDatabase db,
    $StepDailySummaryTable table,
  ) : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$StepDailySummaryTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$StepDailySummaryTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$StepDailySummaryTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<String> memberId = const Value.absent(),
                Value<String> date = const Value.absent(),
                Value<int> totalSteps = const Value.absent(),
                Value<int> activeHours = const Value.absent(),
                Value<int> peakHour = const Value.absent(),
                Value<int> firstActiveHour = const Value.absent(),
                Value<int> lastActiveHour = const Value.absent(),
                Value<double> activityWindowHours = const Value.absent(),
                Value<int> dayOfWeek = const Value.absent(),
                Value<bool> hasWearableSleep = const Value.absent(),
                Value<int?> sleepOnsetTime = const Value.absent(),
                Value<int?> sleepOffsetTime = const Value.absent(),
                Value<int?> sleepDurationMin = const Value.absent(),
                Value<double?> sleepEfficiencyPct = const Value.absent(),
                Value<int?> wakeEpisodes = const Value.absent(),
                Value<DateTime> computedAt = const Value.absent(),
                Value<int> rowid = const Value.absent(),
              }) => StepDailySummaryCompanion(
                memberId: memberId,
                date: date,
                totalSteps: totalSteps,
                activeHours: activeHours,
                peakHour: peakHour,
                firstActiveHour: firstActiveHour,
                lastActiveHour: lastActiveHour,
                activityWindowHours: activityWindowHours,
                dayOfWeek: dayOfWeek,
                hasWearableSleep: hasWearableSleep,
                sleepOnsetTime: sleepOnsetTime,
                sleepOffsetTime: sleepOffsetTime,
                sleepDurationMin: sleepDurationMin,
                sleepEfficiencyPct: sleepEfficiencyPct,
                wakeEpisodes: wakeEpisodes,
                computedAt: computedAt,
                rowid: rowid,
              ),
          createCompanionCallback:
              ({
                required String memberId,
                required String date,
                required int totalSteps,
                required int activeHours,
                required int peakHour,
                required int firstActiveHour,
                required int lastActiveHour,
                required double activityWindowHours,
                required int dayOfWeek,
                Value<bool> hasWearableSleep = const Value.absent(),
                Value<int?> sleepOnsetTime = const Value.absent(),
                Value<int?> sleepOffsetTime = const Value.absent(),
                Value<int?> sleepDurationMin = const Value.absent(),
                Value<double?> sleepEfficiencyPct = const Value.absent(),
                Value<int?> wakeEpisodes = const Value.absent(),
                required DateTime computedAt,
                Value<int> rowid = const Value.absent(),
              }) => StepDailySummaryCompanion.insert(
                memberId: memberId,
                date: date,
                totalSteps: totalSteps,
                activeHours: activeHours,
                peakHour: peakHour,
                firstActiveHour: firstActiveHour,
                lastActiveHour: lastActiveHour,
                activityWindowHours: activityWindowHours,
                dayOfWeek: dayOfWeek,
                hasWearableSleep: hasWearableSleep,
                sleepOnsetTime: sleepOnsetTime,
                sleepOffsetTime: sleepOffsetTime,
                sleepDurationMin: sleepDurationMin,
                sleepEfficiencyPct: sleepEfficiencyPct,
                wakeEpisodes: wakeEpisodes,
                computedAt: computedAt,
                rowid: rowid,
              ),
          withReferenceMapper: (p0) => p0
              .map((e) => (e.readTable(table), BaseReferences(db, table, e)))
              .toList(),
          prefetchHooksCallback: null,
        ),
      );
}

typedef $$StepDailySummaryTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $StepDailySummaryTable,
      StepDailySummaryData,
      $$StepDailySummaryTableFilterComposer,
      $$StepDailySummaryTableOrderingComposer,
      $$StepDailySummaryTableAnnotationComposer,
      $$StepDailySummaryTableCreateCompanionBuilder,
      $$StepDailySummaryTableUpdateCompanionBuilder,
      (
        StepDailySummaryData,
        BaseReferences<
          _$AppDatabase,
          $StepDailySummaryTable,
          StepDailySummaryData
        >,
      ),
      StepDailySummaryData,
      PrefetchHooks Function()
    >;
typedef $$BehaviouralFlagsTableCreateCompanionBuilder =
    BehaviouralFlagsCompanion Function({
      Value<int> id,
      required String memberId,
      required String flagDate,
      required String flagType,
      required String severity,
      required double value,
      required double baseline,
      Value<bool> synced,
      Value<DateTime> createdAt,
    });
typedef $$BehaviouralFlagsTableUpdateCompanionBuilder =
    BehaviouralFlagsCompanion Function({
      Value<int> id,
      Value<String> memberId,
      Value<String> flagDate,
      Value<String> flagType,
      Value<String> severity,
      Value<double> value,
      Value<double> baseline,
      Value<bool> synced,
      Value<DateTime> createdAt,
    });

class $$BehaviouralFlagsTableFilterComposer
    extends Composer<_$AppDatabase, $BehaviouralFlagsTable> {
  $$BehaviouralFlagsTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get memberId => $composableBuilder(
    column: $table.memberId,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get flagDate => $composableBuilder(
    column: $table.flagDate,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get flagType => $composableBuilder(
    column: $table.flagType,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get severity => $composableBuilder(
    column: $table.severity,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get value => $composableBuilder(
    column: $table.value,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get baseline => $composableBuilder(
    column: $table.baseline,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<bool> get synced => $composableBuilder(
    column: $table.synced,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get createdAt => $composableBuilder(
    column: $table.createdAt,
    builder: (column) => ColumnFilters(column),
  );
}

class $$BehaviouralFlagsTableOrderingComposer
    extends Composer<_$AppDatabase, $BehaviouralFlagsTable> {
  $$BehaviouralFlagsTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get memberId => $composableBuilder(
    column: $table.memberId,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get flagDate => $composableBuilder(
    column: $table.flagDate,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get flagType => $composableBuilder(
    column: $table.flagType,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get severity => $composableBuilder(
    column: $table.severity,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get value => $composableBuilder(
    column: $table.value,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get baseline => $composableBuilder(
    column: $table.baseline,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<bool> get synced => $composableBuilder(
    column: $table.synced,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get createdAt => $composableBuilder(
    column: $table.createdAt,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$BehaviouralFlagsTableAnnotationComposer
    extends Composer<_$AppDatabase, $BehaviouralFlagsTable> {
  $$BehaviouralFlagsTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get memberId =>
      $composableBuilder(column: $table.memberId, builder: (column) => column);

  GeneratedColumn<String> get flagDate =>
      $composableBuilder(column: $table.flagDate, builder: (column) => column);

  GeneratedColumn<String> get flagType =>
      $composableBuilder(column: $table.flagType, builder: (column) => column);

  GeneratedColumn<String> get severity =>
      $composableBuilder(column: $table.severity, builder: (column) => column);

  GeneratedColumn<double> get value =>
      $composableBuilder(column: $table.value, builder: (column) => column);

  GeneratedColumn<double> get baseline =>
      $composableBuilder(column: $table.baseline, builder: (column) => column);

  GeneratedColumn<bool> get synced =>
      $composableBuilder(column: $table.synced, builder: (column) => column);

  GeneratedColumn<DateTime> get createdAt =>
      $composableBuilder(column: $table.createdAt, builder: (column) => column);
}

class $$BehaviouralFlagsTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $BehaviouralFlagsTable,
          BehaviouralFlag,
          $$BehaviouralFlagsTableFilterComposer,
          $$BehaviouralFlagsTableOrderingComposer,
          $$BehaviouralFlagsTableAnnotationComposer,
          $$BehaviouralFlagsTableCreateCompanionBuilder,
          $$BehaviouralFlagsTableUpdateCompanionBuilder,
          (
            BehaviouralFlag,
            BaseReferences<
              _$AppDatabase,
              $BehaviouralFlagsTable,
              BehaviouralFlag
            >,
          ),
          BehaviouralFlag,
          PrefetchHooks Function()
        > {
  $$BehaviouralFlagsTableTableManager(
    _$AppDatabase db,
    $BehaviouralFlagsTable table,
  ) : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$BehaviouralFlagsTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$BehaviouralFlagsTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$BehaviouralFlagsTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<String> memberId = const Value.absent(),
                Value<String> flagDate = const Value.absent(),
                Value<String> flagType = const Value.absent(),
                Value<String> severity = const Value.absent(),
                Value<double> value = const Value.absent(),
                Value<double> baseline = const Value.absent(),
                Value<bool> synced = const Value.absent(),
                Value<DateTime> createdAt = const Value.absent(),
              }) => BehaviouralFlagsCompanion(
                id: id,
                memberId: memberId,
                flagDate: flagDate,
                flagType: flagType,
                severity: severity,
                value: value,
                baseline: baseline,
                synced: synced,
                createdAt: createdAt,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required String memberId,
                required String flagDate,
                required String flagType,
                required String severity,
                required double value,
                required double baseline,
                Value<bool> synced = const Value.absent(),
                Value<DateTime> createdAt = const Value.absent(),
              }) => BehaviouralFlagsCompanion.insert(
                id: id,
                memberId: memberId,
                flagDate: flagDate,
                flagType: flagType,
                severity: severity,
                value: value,
                baseline: baseline,
                synced: synced,
                createdAt: createdAt,
              ),
          withReferenceMapper: (p0) => p0
              .map((e) => (e.readTable(table), BaseReferences(db, table, e)))
              .toList(),
          prefetchHooksCallback: null,
        ),
      );
}

typedef $$BehaviouralFlagsTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $BehaviouralFlagsTable,
      BehaviouralFlag,
      $$BehaviouralFlagsTableFilterComposer,
      $$BehaviouralFlagsTableOrderingComposer,
      $$BehaviouralFlagsTableAnnotationComposer,
      $$BehaviouralFlagsTableCreateCompanionBuilder,
      $$BehaviouralFlagsTableUpdateCompanionBuilder,
      (
        BehaviouralFlag,
        BaseReferences<_$AppDatabase, $BehaviouralFlagsTable, BehaviouralFlag>,
      ),
      BehaviouralFlag,
      PrefetchHooks Function()
    >;
typedef $$ServiceHeartbeatsTableCreateCompanionBuilder =
    ServiceHeartbeatsCompanion Function({
      Value<int> id,
      required DateTime timestamp,
      required String platform,
      required String triggerSource,
      Value<int> stepsCaptured,
      Value<bool> synced,
    });
typedef $$ServiceHeartbeatsTableUpdateCompanionBuilder =
    ServiceHeartbeatsCompanion Function({
      Value<int> id,
      Value<DateTime> timestamp,
      Value<String> platform,
      Value<String> triggerSource,
      Value<int> stepsCaptured,
      Value<bool> synced,
    });

class $$ServiceHeartbeatsTableFilterComposer
    extends Composer<_$AppDatabase, $ServiceHeartbeatsTable> {
  $$ServiceHeartbeatsTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get timestamp => $composableBuilder(
    column: $table.timestamp,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get platform => $composableBuilder(
    column: $table.platform,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get triggerSource => $composableBuilder(
    column: $table.triggerSource,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get stepsCaptured => $composableBuilder(
    column: $table.stepsCaptured,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<bool> get synced => $composableBuilder(
    column: $table.synced,
    builder: (column) => ColumnFilters(column),
  );
}

class $$ServiceHeartbeatsTableOrderingComposer
    extends Composer<_$AppDatabase, $ServiceHeartbeatsTable> {
  $$ServiceHeartbeatsTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get timestamp => $composableBuilder(
    column: $table.timestamp,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get platform => $composableBuilder(
    column: $table.platform,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get triggerSource => $composableBuilder(
    column: $table.triggerSource,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get stepsCaptured => $composableBuilder(
    column: $table.stepsCaptured,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<bool> get synced => $composableBuilder(
    column: $table.synced,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$ServiceHeartbeatsTableAnnotationComposer
    extends Composer<_$AppDatabase, $ServiceHeartbeatsTable> {
  $$ServiceHeartbeatsTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<DateTime> get timestamp =>
      $composableBuilder(column: $table.timestamp, builder: (column) => column);

  GeneratedColumn<String> get platform =>
      $composableBuilder(column: $table.platform, builder: (column) => column);

  GeneratedColumn<String> get triggerSource => $composableBuilder(
    column: $table.triggerSource,
    builder: (column) => column,
  );

  GeneratedColumn<int> get stepsCaptured => $composableBuilder(
    column: $table.stepsCaptured,
    builder: (column) => column,
  );

  GeneratedColumn<bool> get synced =>
      $composableBuilder(column: $table.synced, builder: (column) => column);
}

class $$ServiceHeartbeatsTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $ServiceHeartbeatsTable,
          ServiceHeartbeat,
          $$ServiceHeartbeatsTableFilterComposer,
          $$ServiceHeartbeatsTableOrderingComposer,
          $$ServiceHeartbeatsTableAnnotationComposer,
          $$ServiceHeartbeatsTableCreateCompanionBuilder,
          $$ServiceHeartbeatsTableUpdateCompanionBuilder,
          (
            ServiceHeartbeat,
            BaseReferences<
              _$AppDatabase,
              $ServiceHeartbeatsTable,
              ServiceHeartbeat
            >,
          ),
          ServiceHeartbeat,
          PrefetchHooks Function()
        > {
  $$ServiceHeartbeatsTableTableManager(
    _$AppDatabase db,
    $ServiceHeartbeatsTable table,
  ) : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$ServiceHeartbeatsTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$ServiceHeartbeatsTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$ServiceHeartbeatsTableAnnotationComposer(
                $db: db,
                $table: table,
              ),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<DateTime> timestamp = const Value.absent(),
                Value<String> platform = const Value.absent(),
                Value<String> triggerSource = const Value.absent(),
                Value<int> stepsCaptured = const Value.absent(),
                Value<bool> synced = const Value.absent(),
              }) => ServiceHeartbeatsCompanion(
                id: id,
                timestamp: timestamp,
                platform: platform,
                triggerSource: triggerSource,
                stepsCaptured: stepsCaptured,
                synced: synced,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required DateTime timestamp,
                required String platform,
                required String triggerSource,
                Value<int> stepsCaptured = const Value.absent(),
                Value<bool> synced = const Value.absent(),
              }) => ServiceHeartbeatsCompanion.insert(
                id: id,
                timestamp: timestamp,
                platform: platform,
                triggerSource: triggerSource,
                stepsCaptured: stepsCaptured,
                synced: synced,
              ),
          withReferenceMapper: (p0) => p0
              .map((e) => (e.readTable(table), BaseReferences(db, table, e)))
              .toList(),
          prefetchHooksCallback: null,
        ),
      );
}

typedef $$ServiceHeartbeatsTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $ServiceHeartbeatsTable,
      ServiceHeartbeat,
      $$ServiceHeartbeatsTableFilterComposer,
      $$ServiceHeartbeatsTableOrderingComposer,
      $$ServiceHeartbeatsTableAnnotationComposer,
      $$ServiceHeartbeatsTableCreateCompanionBuilder,
      $$ServiceHeartbeatsTableUpdateCompanionBuilder,
      (
        ServiceHeartbeat,
        BaseReferences<
          _$AppDatabase,
          $ServiceHeartbeatsTable,
          ServiceHeartbeat
        >,
      ),
      ServiceHeartbeat,
      PrefetchHooks Function()
    >;
typedef $$DataGapsTableCreateCompanionBuilder =
    DataGapsCompanion Function({
      Value<int> id,
      required String memberId,
      required String gapDate,
      required int gapStartHour,
      required int gapEndHour,
      required int gapDurationMinutes,
      required DateTime detectedAt,
    });
typedef $$DataGapsTableUpdateCompanionBuilder =
    DataGapsCompanion Function({
      Value<int> id,
      Value<String> memberId,
      Value<String> gapDate,
      Value<int> gapStartHour,
      Value<int> gapEndHour,
      Value<int> gapDurationMinutes,
      Value<DateTime> detectedAt,
    });

class $$DataGapsTableFilterComposer
    extends Composer<_$AppDatabase, $DataGapsTable> {
  $$DataGapsTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get memberId => $composableBuilder(
    column: $table.memberId,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get gapDate => $composableBuilder(
    column: $table.gapDate,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get gapStartHour => $composableBuilder(
    column: $table.gapStartHour,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get gapEndHour => $composableBuilder(
    column: $table.gapEndHour,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get gapDurationMinutes => $composableBuilder(
    column: $table.gapDurationMinutes,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get detectedAt => $composableBuilder(
    column: $table.detectedAt,
    builder: (column) => ColumnFilters(column),
  );
}

class $$DataGapsTableOrderingComposer
    extends Composer<_$AppDatabase, $DataGapsTable> {
  $$DataGapsTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get memberId => $composableBuilder(
    column: $table.memberId,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get gapDate => $composableBuilder(
    column: $table.gapDate,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get gapStartHour => $composableBuilder(
    column: $table.gapStartHour,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get gapEndHour => $composableBuilder(
    column: $table.gapEndHour,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get gapDurationMinutes => $composableBuilder(
    column: $table.gapDurationMinutes,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get detectedAt => $composableBuilder(
    column: $table.detectedAt,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$DataGapsTableAnnotationComposer
    extends Composer<_$AppDatabase, $DataGapsTable> {
  $$DataGapsTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get memberId =>
      $composableBuilder(column: $table.memberId, builder: (column) => column);

  GeneratedColumn<String> get gapDate =>
      $composableBuilder(column: $table.gapDate, builder: (column) => column);

  GeneratedColumn<int> get gapStartHour => $composableBuilder(
    column: $table.gapStartHour,
    builder: (column) => column,
  );

  GeneratedColumn<int> get gapEndHour => $composableBuilder(
    column: $table.gapEndHour,
    builder: (column) => column,
  );

  GeneratedColumn<int> get gapDurationMinutes => $composableBuilder(
    column: $table.gapDurationMinutes,
    builder: (column) => column,
  );

  GeneratedColumn<DateTime> get detectedAt => $composableBuilder(
    column: $table.detectedAt,
    builder: (column) => column,
  );
}

class $$DataGapsTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $DataGapsTable,
          DataGap,
          $$DataGapsTableFilterComposer,
          $$DataGapsTableOrderingComposer,
          $$DataGapsTableAnnotationComposer,
          $$DataGapsTableCreateCompanionBuilder,
          $$DataGapsTableUpdateCompanionBuilder,
          (DataGap, BaseReferences<_$AppDatabase, $DataGapsTable, DataGap>),
          DataGap,
          PrefetchHooks Function()
        > {
  $$DataGapsTableTableManager(_$AppDatabase db, $DataGapsTable table)
    : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$DataGapsTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$DataGapsTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$DataGapsTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<String> memberId = const Value.absent(),
                Value<String> gapDate = const Value.absent(),
                Value<int> gapStartHour = const Value.absent(),
                Value<int> gapEndHour = const Value.absent(),
                Value<int> gapDurationMinutes = const Value.absent(),
                Value<DateTime> detectedAt = const Value.absent(),
              }) => DataGapsCompanion(
                id: id,
                memberId: memberId,
                gapDate: gapDate,
                gapStartHour: gapStartHour,
                gapEndHour: gapEndHour,
                gapDurationMinutes: gapDurationMinutes,
                detectedAt: detectedAt,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required String memberId,
                required String gapDate,
                required int gapStartHour,
                required int gapEndHour,
                required int gapDurationMinutes,
                required DateTime detectedAt,
              }) => DataGapsCompanion.insert(
                id: id,
                memberId: memberId,
                gapDate: gapDate,
                gapStartHour: gapStartHour,
                gapEndHour: gapEndHour,
                gapDurationMinutes: gapDurationMinutes,
                detectedAt: detectedAt,
              ),
          withReferenceMapper: (p0) => p0
              .map((e) => (e.readTable(table), BaseReferences(db, table, e)))
              .toList(),
          prefetchHooksCallback: null,
        ),
      );
}

typedef $$DataGapsTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $DataGapsTable,
      DataGap,
      $$DataGapsTableFilterComposer,
      $$DataGapsTableOrderingComposer,
      $$DataGapsTableAnnotationComposer,
      $$DataGapsTableCreateCompanionBuilder,
      $$DataGapsTableUpdateCompanionBuilder,
      (DataGap, BaseReferences<_$AppDatabase, $DataGapsTable, DataGap>),
      DataGap,
      PrefetchHooks Function()
    >;
typedef $$LocationLogsTableCreateCompanionBuilder =
    LocationLogsCompanion Function({
      Value<int> id,
      required DateTime timestamp,
      required double latitude,
      required double longitude,
      required double accuracyMeters,
      Value<double?> altitudeMeters,
      Value<double?> speedMs,
      Value<String?> event,
      Value<bool> synced,
    });
typedef $$LocationLogsTableUpdateCompanionBuilder =
    LocationLogsCompanion Function({
      Value<int> id,
      Value<DateTime> timestamp,
      Value<double> latitude,
      Value<double> longitude,
      Value<double> accuracyMeters,
      Value<double?> altitudeMeters,
      Value<double?> speedMs,
      Value<String?> event,
      Value<bool> synced,
    });

class $$LocationLogsTableFilterComposer
    extends Composer<_$AppDatabase, $LocationLogsTable> {
  $$LocationLogsTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get timestamp => $composableBuilder(
    column: $table.timestamp,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get latitude => $composableBuilder(
    column: $table.latitude,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get longitude => $composableBuilder(
    column: $table.longitude,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get accuracyMeters => $composableBuilder(
    column: $table.accuracyMeters,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get altitudeMeters => $composableBuilder(
    column: $table.altitudeMeters,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get speedMs => $composableBuilder(
    column: $table.speedMs,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get event => $composableBuilder(
    column: $table.event,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<bool> get synced => $composableBuilder(
    column: $table.synced,
    builder: (column) => ColumnFilters(column),
  );
}

class $$LocationLogsTableOrderingComposer
    extends Composer<_$AppDatabase, $LocationLogsTable> {
  $$LocationLogsTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get timestamp => $composableBuilder(
    column: $table.timestamp,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get latitude => $composableBuilder(
    column: $table.latitude,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get longitude => $composableBuilder(
    column: $table.longitude,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get accuracyMeters => $composableBuilder(
    column: $table.accuracyMeters,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get altitudeMeters => $composableBuilder(
    column: $table.altitudeMeters,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get speedMs => $composableBuilder(
    column: $table.speedMs,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get event => $composableBuilder(
    column: $table.event,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<bool> get synced => $composableBuilder(
    column: $table.synced,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$LocationLogsTableAnnotationComposer
    extends Composer<_$AppDatabase, $LocationLogsTable> {
  $$LocationLogsTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<DateTime> get timestamp =>
      $composableBuilder(column: $table.timestamp, builder: (column) => column);

  GeneratedColumn<double> get latitude =>
      $composableBuilder(column: $table.latitude, builder: (column) => column);

  GeneratedColumn<double> get longitude =>
      $composableBuilder(column: $table.longitude, builder: (column) => column);

  GeneratedColumn<double> get accuracyMeters => $composableBuilder(
    column: $table.accuracyMeters,
    builder: (column) => column,
  );

  GeneratedColumn<double> get altitudeMeters => $composableBuilder(
    column: $table.altitudeMeters,
    builder: (column) => column,
  );

  GeneratedColumn<double> get speedMs =>
      $composableBuilder(column: $table.speedMs, builder: (column) => column);

  GeneratedColumn<String> get event =>
      $composableBuilder(column: $table.event, builder: (column) => column);

  GeneratedColumn<bool> get synced =>
      $composableBuilder(column: $table.synced, builder: (column) => column);
}

class $$LocationLogsTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $LocationLogsTable,
          LocationLog,
          $$LocationLogsTableFilterComposer,
          $$LocationLogsTableOrderingComposer,
          $$LocationLogsTableAnnotationComposer,
          $$LocationLogsTableCreateCompanionBuilder,
          $$LocationLogsTableUpdateCompanionBuilder,
          (
            LocationLog,
            BaseReferences<_$AppDatabase, $LocationLogsTable, LocationLog>,
          ),
          LocationLog,
          PrefetchHooks Function()
        > {
  $$LocationLogsTableTableManager(_$AppDatabase db, $LocationLogsTable table)
    : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$LocationLogsTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$LocationLogsTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$LocationLogsTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<DateTime> timestamp = const Value.absent(),
                Value<double> latitude = const Value.absent(),
                Value<double> longitude = const Value.absent(),
                Value<double> accuracyMeters = const Value.absent(),
                Value<double?> altitudeMeters = const Value.absent(),
                Value<double?> speedMs = const Value.absent(),
                Value<String?> event = const Value.absent(),
                Value<bool> synced = const Value.absent(),
              }) => LocationLogsCompanion(
                id: id,
                timestamp: timestamp,
                latitude: latitude,
                longitude: longitude,
                accuracyMeters: accuracyMeters,
                altitudeMeters: altitudeMeters,
                speedMs: speedMs,
                event: event,
                synced: synced,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required DateTime timestamp,
                required double latitude,
                required double longitude,
                required double accuracyMeters,
                Value<double?> altitudeMeters = const Value.absent(),
                Value<double?> speedMs = const Value.absent(),
                Value<String?> event = const Value.absent(),
                Value<bool> synced = const Value.absent(),
              }) => LocationLogsCompanion.insert(
                id: id,
                timestamp: timestamp,
                latitude: latitude,
                longitude: longitude,
                accuracyMeters: accuracyMeters,
                altitudeMeters: altitudeMeters,
                speedMs: speedMs,
                event: event,
                synced: synced,
              ),
          withReferenceMapper: (p0) => p0
              .map((e) => (e.readTable(table), BaseReferences(db, table, e)))
              .toList(),
          prefetchHooksCallback: null,
        ),
      );
}

typedef $$LocationLogsTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $LocationLogsTable,
      LocationLog,
      $$LocationLogsTableFilterComposer,
      $$LocationLogsTableOrderingComposer,
      $$LocationLogsTableAnnotationComposer,
      $$LocationLogsTableCreateCompanionBuilder,
      $$LocationLogsTableUpdateCompanionBuilder,
      (
        LocationLog,
        BaseReferences<_$AppDatabase, $LocationLogsTable, LocationLog>,
      ),
      LocationLog,
      PrefetchHooks Function()
    >;

class $AppDatabaseManager {
  final _$AppDatabase _db;
  $AppDatabaseManager(this._db);
  $$StepHourlyRawTableTableManager get stepHourlyRaw =>
      $$StepHourlyRawTableTableManager(_db, _db.stepHourlyRaw);
  $$StepDailySummaryTableTableManager get stepDailySummary =>
      $$StepDailySummaryTableTableManager(_db, _db.stepDailySummary);
  $$BehaviouralFlagsTableTableManager get behaviouralFlags =>
      $$BehaviouralFlagsTableTableManager(_db, _db.behaviouralFlags);
  $$ServiceHeartbeatsTableTableManager get serviceHeartbeats =>
      $$ServiceHeartbeatsTableTableManager(_db, _db.serviceHeartbeats);
  $$DataGapsTableTableManager get dataGaps =>
      $$DataGapsTableTableManager(_db, _db.dataGaps);
  $$LocationLogsTableTableManager get locationLogs =>
      $$LocationLogsTableTableManager(_db, _db.locationLogs);
}
