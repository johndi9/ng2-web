import * as moment from 'moment';

const jsonMetadataKey = 'jsonProperty';
const DATE_SEPARATOR = '/';
// Formats expected from json
const FORMAT_YEAR_ONLY = 'YYYY';
const FORMAT_YEAR_MONTH = 'YYYY' + DATE_SEPARATOR + 'MM';
const FORMAT_YEAR_MONTH_DAY = 'YYYY' + DATE_SEPARATOR + 'MM' + DATE_SEPARATOR + 'DD';
const attributesWithDateType: string[] = ['date', 'start', 'end', 'lastUpdate'];

export interface JsonMetaData<T> {
  name?: string;
  clazz?: { new(): T };
}

export function JsonProperty<T>(metadata?: JsonMetaData<T>|string): any {
  if (metadata instanceof String || typeof metadata === 'string') {
    return Reflect.metadata(jsonMetadataKey, {
      name: metadata,
      clazz: undefined
    });
  } else {
    let metadataObj = <JsonMetaData<T>>metadata;

    return Reflect.metadata(jsonMetadataKey, {
      name: metadataObj ? metadataObj.name : undefined,
      clazz: metadataObj ? metadataObj.clazz : undefined
    });
  }
}

export default class MapUtils {

  static getClazz(target: any, propertyKey: string): any {
    return Reflect.getMetadata('design:type', target, propertyKey);
  }

  static getJsonProperty<T>(target: any, propertyKey: string): JsonMetaData<T> {
    return Reflect.getMetadata(jsonMetadataKey, target, propertyKey);
  }

  static isPrimitive(obj) {
    switch (typeof obj) {
      case 'string':
      case 'number':
      case 'boolean':
        return true;
    }
    return !!(obj instanceof String || obj === String || obj instanceof Number ||
    obj === Number || obj instanceof Boolean || obj === Boolean);
  }

  static isDateType(key): boolean {
    return !!attributesWithDateType.find(attr => attr === key);
  }

  /**
   * Set the data on each json attribute based on the type
   * @param jsonObject
   * @param key
   * @returns {any}
   */
  static parseData(jsonObject, key): any {
    if (MapUtils.isDateType(key)) {
      return jsonObject[key] instanceof Date ? jsonObject[key] : MapUtils.parseDate(jsonObject[key]);
    }
    return jsonObject[key];
  }

  static parseDate(dateNotParsed): Date {
    if(dateNotParsed === '') return null;

    const dateSplitted: string[] = dateNotParsed.split(DATE_SEPARATOR);
    let format: string;

    switch (dateSplitted.length) {
      case 1:
        format = FORMAT_YEAR_ONLY;
        break;
      case 2:
        format = FORMAT_YEAR_MONTH;
        break;
      default:
        format = FORMAT_YEAR_MONTH_DAY;
        break;
    }

    return moment(dateNotParsed, format).toDate();
  }

  static isArray(object) {
    if (object === Array) {
      return true;
    } else if (typeof Array.isArray === 'function') {
      return Array.isArray(object);
    } else {
      return !!(object instanceof Array);
    }
  }

  static deserialize<T>(clazz: { new(): T }, jsonObject, isDeepJson?: boolean) {
    if ((clazz === undefined) || (jsonObject === undefined)) {
      return undefined;
    }

    let obj = isDeepJson ? jsonObject : new clazz();

    Object.keys(obj).forEach((key) => {
      let propertyMetadataFn: ((jsonMetaData) => any) = (propertyMetadata) => {

        let propertyName = propertyMetadata.name || key;
        let innerJson = jsonObject ? jsonObject[propertyName] : undefined;
        let innerClazz = isDeepJson ? obj[key] : this.getClazz(obj, key);

        if (MapUtils.isArray(innerClazz)) {
          let metadata = isDeepJson ? propertyMetadata : this.getJsonProperty(obj, key);
          if (metadata.clazz || MapUtils.isPrimitive(innerClazz)) {
            if (innerJson && MapUtils.isArray(innerJson)) {
              return innerJson.map(
                (item) => MapUtils.deserialize(metadata.clazz, item)
              );
            } else {
              return undefined;
            }
          } else {
            return innerJson;
          }

        } else if (!MapUtils.isPrimitive(innerClazz)) {
          return propertyMetadata.clazz === innerClazz ?
            MapUtils.deserialize(innerClazz, innerJson) : MapUtils.deserialize(propertyMetadata.clazz, innerJson, true);
        } else {
          return jsonObject ? jsonObject[propertyName] : undefined;
        }
      };

      const isDeepJsonArray: boolean = isDeepJson && MapUtils.isArray(obj[key]);
      let propertyMetadata = this.getJsonProperty(obj, key);

      if (propertyMetadata || isDeepJsonArray) {
        obj[key] = propertyMetadataFn(isDeepJsonArray ? {clazz: clazz} : propertyMetadata);
      } else {
        if (jsonObject && jsonObject[key] !== undefined) {
          obj[key] = MapUtils.parseData(jsonObject, key);
        }
      }
    });

    return obj;
  }
}
