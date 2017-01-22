const jsonMetadataKey = 'jsonProperty';

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
          obj[key] = jsonObject[key];
        }
      }
    });

    return obj;
  }
}
