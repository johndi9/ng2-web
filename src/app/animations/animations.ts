export const animationArray = {
  bounceInRight: {
    startingStyles: {
      styles: [{}]
    },
    keyframes: [
      {
        offset: 0,
        styles: {
          styles: [{
            transform: 'translate3d(1000px, 0, 0)',
            opacity: 0
          }]
        }
      },
      {
        offset: 0.5,
        styles: {
          styles: [{
            transform: 'translate3d(-20px, 0, 0)',
            opacity: 1
          }]
        }
      },
      {
        offset: 0.8,
        styles: {
          styles: [{
            transform: 'translate3d(10px, 0, 0)',
            opacity: 1
          }]
        }
      },
      {
        offset: 1,
        styles: {
          styles: [{
            transform: 'translate3d(0, 0, 0)',
            opacity: 1
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
            transform: 'translate3d(0, 0, 0)',
            opacity: 1
          }]
        }
      },
      {
        offset: 0.2,
        styles: {
          styles: [{
            transform: 'translate3d(10px, 0, 0)',
            opacity: 1
          }]
        }
      },
      {
        offset: 0.5,
        styles: {
          styles: [{
            transform: 'translate3d(-20px, 0, 0)',
            opacity: 1
          }]
        }
      },
      {
        offset: 1,
        styles: {
          styles: [{
            transform: 'translate3d(1000px, 0, 0)',
            opacity: 0
          }]
        }
      }
    ]
  },
  bounceInDown: {
    startingStyles: {
      styles: [{}]
    },
    keyframes: [
      {
        offset: 0,
        styles: {
          styles: [{
            transform: 'translate3d(0, -1000px, 0)',
            opacity: 0
          }]
        }
      },
      {
        offset: 0.5,
        styles: {
          styles: [{
            transform: 'translate3d(0, 20px, 0)',
            opacity: 1
          }]
        }
      },
      {
        offset: 0.8,
        styles: {
          styles: [{
            transform: 'translate3d(0, -10px, 0)',
            opacity: 1
          }]
        }
      },
      {
        offset: 1,
        styles: {
          styles: [{
            transform: 'translate3d(0, 0, 0)',
            opacity: 1
          }]
        }
      }
    ]
  },
  bounceOutDown: {
    startingStyles: {
      styles: [{}]
    },
    keyframes: [
      {
        offset: 0,
        styles: {
          styles: [{
            transform: 'translate3d(0, 0, 0)',
            opacity: 1
          }]
        }
      },
      {
        offset: 0.2,
        styles: {
          styles: [{
            transform: 'translate3d(0, 10px, 0)',
            opacity: 1
          }]
        }
      },
      {
        offset: 0.5,
        styles: {
          styles: [{
            transform: 'translate3d(0, -20px, 0)',
            opacity: 1
          }]
        }
      },
      {
        offset: 1,
        styles: {
          styles: [{
            transform: 'translate3d(0, 1000px, 0)',
            opacity: 0
          }]
        }
      }
    ]
  },
  hideElement: {
    startingStyles: {
      styles: [{}]
    },
    keyframes: [
      {
        offset: 0,
        styles: {
          styles: [{
            opacity: 0
          }]
        }
      },
      {
        offset: 1,
        styles: {
          styles: [{
            opacity: 0
          }]
        }
      }
    ]
  },
};