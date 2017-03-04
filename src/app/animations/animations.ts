export const animationSettings = {
  'gt-md': {
    duration: 2000,
    delay: 30,
    positionMinAbs: 0,
    positionMaxAbs: 150
  },
  'lt-md': {
    duration: 500,
    delay: 50,
    positionMinAbs: 0,
    positionMaxAbs: 50
  }
};

export const easeTypes = {
  bounceInRight: 'cubic-bezier(0.19, 1, 0.22, 1)'
};

export function animationArray(screenType: string) {
  const minAbs: number = animationSettings[screenType].positionMinAbs;
  const maxAbs: number = animationSettings[screenType].positionMaxAbs;

  return {
    bounceInRight: {
      startingStyles: {
        styles: [{}]
      },
      keyframes: [
        {
          offset: 0,
          styles: {
            styles: [{
              transform: 'translateX(' + minAbs + 'px)',
            }]
          }
        },
        {
          offset: 0.35,
          styles: {
            styles: [{
              transform: 'translateX(-' + maxAbs + 'px)',
            }]
          }
        },
        {
          offset: 1,
          styles: {
            styles: [{
              transform: 'translateX(' + minAbs + 'px)',
            }]
          }
        }
      ]
    },
    bounceInLeft: {
      startingStyles: {
        styles: [{}]
      },
      keyframes: [
        {
          offset: 0,
          styles: {
            styles: [{
              transform: 'translateX(' + minAbs + 'px)',
            }]
          }
        },
        {
          offset: 0.35,
          styles: {
            styles: [{
              transform: 'translateX(' + maxAbs + 'px)',
            }]
          }
        },
        {
          offset: 1,
          styles: {
            styles: [{
              transform: 'translateX(' + minAbs + 'px)',
            }]
          }
        }
      ]
    },
    bounceOutRight: {
      startingStyles: {
        styles: [{}]
      },
      keyframes: [
        {
          offset: 0,
          styles: {
            styles: [{
              transform: 'translateX(' + minAbs + 'px)',
            }]
          }
        },
        {
          offset: 0.5,
          styles: {
            styles: [{
              transform: 'translateX(' + maxAbs + 'px)',
            }]
          }
        },
        {
          offset: 1,
          styles: {
            styles: [{
              transform: 'translateX(' + minAbs + 'px)',
            }]
          }
        }
      ]
    },
    bounceOutLeft: {
      startingStyles: {
        styles: [{}]
      },
      keyframes: [
        {
          offset: 0,
          styles: {
            styles: [{
              transform: 'translateX(' + minAbs + 'px)',
            }]
          }
        },
        {
          offset: 0.5,
          styles: {
            styles: [{
              transform: 'translateX(-' + maxAbs + 'px)',
            }]
          }
        },
        {
          offset: 1,
          styles: {
            styles: [{
              transform: 'translateX(' + minAbs + 'px)',
            }]
          }
        }
      ]
    }
  };
};