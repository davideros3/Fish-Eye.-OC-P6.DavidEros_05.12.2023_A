
  function galleryFactory(data, index) {
    const { id, photographerId, image, title, date, video, price, likes } = data;
  
    function getMediaCardDOM() {
      // Media type: photo or video
      if (data.hasOwnProperty('image')) {
        return getImage();
      } else if (data.hasOwnProperty('video')) {
        return getVideo();
      } else {
        console.log('Unknown media type');
        return 'ERROR: UNKNOWN MEDIA TYPE';
      }
    }
  
    function getImage() {
      const Classicone1 = 'fa-regular';
      const Classicone2 = 'fa-heart';
  
      // Sticky popup
      const Nb_likes = document.querySelector('.Nb_likes');
      Nb_likes.innerHTML = parseInt(Nb_likes.innerHTML) + likes;
      const thumbnail = document.createElement('div');
      thumbnail.classList.add('thumbnail');
      thumbnail.setAttribute('aria-labelledby', title);
      const mediaPath = `assets/images/photos/${image}`;
      media = document.createElement('img');
      media.setAttribute('src', mediaPath);
      media.setAttribute('alt', title);
      media.setAttribute('tabindex', '0');
      thumbnail.appendChild(media);
  
      // Mouse navigation
      media.addEventListener('click', () => {
        const pageMain = document.querySelector('main');
        pageMain.setAttribute('aria-hidden', true);
        pageMain.setAttribute('tabindex', '-1');
        const header = document.querySelector('header');
        header.setAttribute('aria-hidden', true);
        header.setAttribute('tabindex', '-1');
        lightBoxPhoto(index);
      });
  
      // Keyboard navigation: Press "Enter" if the thumbnail is focused
      media.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const pageMain = document.querySelector('main');
          pageMain.setAttribute('aria-hidden', true);
          const header = document.querySelector('header');
          header.setAttribute('aria-hidden', true);
          lightBoxPhoto(index);
        }
      });
  
      // Media legend block in the gallery
      const legend = document.createElement('div');
      legend.classList.add('legend');
      thumbnail.appendChild(legend);
      // Media legend text
      const legendText = document.createElement('p');
      legendText.classList.add('legendText');
      legendText.innerHTML = title;
      legend.appendChild(legendText);
  
      // Number of "likes" + heart icon block
      const nblove = document.createElement('div');
      nblove.classList.add('nblove');
      legend.appendChild(nblove);
      // Number of "likes"
      const Nb = document.createElement('div');
      Nb.classList.add('Nb');
      nblove.appendChild(Nb);
      Nb.innerHTML = likes;
      // Like icon
      const love = document.createElement('div');
      love.classList.add('love');
      love.setAttribute('role', 'button');
      nblove.appendChild(love);
      const tag_i = document.createElement('i');
      tag_i.classList.add(Classicone1, Classicone2);
      tag_i.setAttribute('aria-label', 'Like this photo');
      tag_i.setAttribute('tabindex', '0');
      love.appendChild(tag_i);
  
      return thumbnail;
    }
  
    function getVideo() {
      const Classicone1 = 'fa-regular';
      const Classicone2 = 'fa-heart';
  
      // Likes count
      const Nb_likes = document.querySelector('.Nb_likes');
      Nb_likes.innerHTML = parseInt(Nb_likes.innerHTML) + likes;
      const thumbnail = document.createElement('div');
      thumbnail.classList.add('thumbnail');
      thumbnail.setAttribute('aria-labelledby', title);
      const mediaPath = `assets/images/videos/${video}`;
      media = document.createElement('video');
      media.setAttribute('src', mediaPath);
      media.setAttribute('alt', title);
      media.setAttribute('aria-label', title);
      media.setAttribute('tabindex', '0');
      thumbnail.appendChild(media);
  
      // Mouse navigation
      media.addEventListener('click', () => {
        const pageMain = document.querySelector('main');
        pageMain.setAttribute('aria-hidden', true);
        pageMain.setAttribute('tabindex', '-1');
        const header = document.querySelector('header');
        header.setAttribute('aria-hidden', true);
        header.setAttribute('tabindex', '-1');
        lightBoxVideo(index);
      });
  
      // Keyboard navigation: Press "Enter" if the thumbnail is focused
      media.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const pageMain = document.querySelector('main');
          pageMain.setAttribute('aria-hidden', true);
          const header = document.querySelector('header');
          header.setAttribute('aria-hidden', true);
          lightBoxPhoto(index);
        }
      });
  
      // Media legend block
      const legend = document.createElement('div');
      legend.classList.add('legend');
      thumbnail.appendChild(legend);
      // Media legend text
      const legendText = document.createElement('p');
      legendText.classList.add('legendText');
      legendText.innerHTML = title;
      legend.appendChild(legendText);
  
      // Number of "likes" + heart icon block
      const nblove = document.createElement('div');
      nblove.classList.add('nblove');
      legend.appendChild(nblove);

    
  
      // Number of "likes"
      const Nb = document.createElement('div');
      Nb.classList.add('Nb');
      nblove.appendChild(Nb);
      Nb.innerHTML = likes;
  
      // Like icon
      const love = document.createElement('div');
      love.classList.add('love');
      love.setAttribute('role', 'button');
      nblove.appendChild(love);
      const tag_i = document.createElement('i');
      tag_i.classList.add(Classicone1, Classicone2);
      tag_i.setAttribute('aria-label', 'Like this video');
      tag_i.setAttribute('tabindex', '0');
      love.appendChild(tag_i);
  
      return thumbnail;
    }
  
    return { id, photographerId, image, title, date, video, price, likes, getMediaCardDOM };
  }
  function lightBoxVideo(index) {
    // Keyboard navigation: "Arrow Left" and "Arrow Right" keys
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && lightbox.classList.contains('show')) {
            if (medias.length <= (index + 1)) {
                if (medias[0].hasOwnProperty('video')) {
                    lightBoxVideo(0);
                } else {
                    lightBoxPhoto(0);
                }
            } else {
                if (medias[(index + 1)].hasOwnProperty('video')) {
                    lightBoxVideo(index + 1);
                } else {
                    lightBoxPhoto(index + 1);
                }
            }
        }
        if (e.key === 'ArrowLeft' && lightbox.classList.contains('show')) {
            if (index <= 1) {
                if (medias[medias.length - 1].hasOwnProperty('video')) {
                    lightBoxVideo(medias.length - 1);
                } else {
                    lightBoxPhoto(medias.length - 1);
                }
            } else {
                if (medias[(index - 1)].hasOwnProperty('video')) {
                    lightBoxVideo(index - 1);
                } else {
                    lightBoxPhoto(index - 1);
                }
            }
        };
    });

    // Mouse navigation: click on "previous" or "next" arrows
    const next = document.querySelector('.next');
    next.onclick = () => {
        if (medias.length <= (index + 1)) {
            if (medias[0].hasOwnProperty('video')) {
                lightBoxVideo(0);
            } else {
                lightBoxPhoto(0);
            }
        } else {
            if (medias[(index + 1)].hasOwnProperty('video')) {
                lightBoxVideo(index + 1);
            } else {
                lightBoxPhoto(index + 1);
            }
        }
    };

    const previous = document.querySelector('.previous');
    previous.onclick = () => {
        if (index <= 1) {
            if (medias[medias.length - 1].hasOwnProperty('video')) {
                lightBoxVideo(medias.length - 1);
            } else {
                lightBoxPhoto(medias.length - 1);
            }
        } else {
            if (medias[(index - 1)].hasOwnProperty('video')) {
                lightBoxVideo(index - 1);
            } else {
                lightBoxPhoto(index - 1);
            }
        }
    };

    // Keyboard navigation: Press "Enter" if the next button is focused
    next.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (medias.length <= (index + 1)) {
                if (medias[0].hasOwnProperty('video')) {
                    lightBoxVideo(0);
                    next.focus();
                } else {
                    lightBoxPhoto(0);
                    next.focus();
                }
            } else {
                if (medias[(index + 1)].hasOwnProperty('video')) {
                    lightBoxVideo(index + 1);
                    next.focus();
                } else {
                    lightBoxPhoto(index + 1);
                    next.focus();
                }
            }
        };
    });

    // Keyboard navigation: Press "Enter" if the previous button is focused
    previous.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (index <= 1) {
                if (medias[medias.length - 1].hasOwnProperty('video')) {
                    lightBoxVideo(medias.length - 1);
                    previous.focus();
                } else {
                    lightBoxPhoto(medias.length - 1);
                    previous.focus();
                }
            } else {
                if (medias[(index - 1)].hasOwnProperty('video')) {
                    lightBoxVideo(index - 1);
                    previous.focus();
                } else {
                    lightBoxPhoto(index - 1);
                    previous.focus();
                }
            }
        }
    });

    // Building the DOM for the lightbox and displaying it
    const lightbox = document.querySelector('.lightbox_container');
    const lightBoxMedia = document.querySelector('.media');
    lightBoxMedia.setAttribute('tabindex', '0');
    const main = document.querySelector('main');
    const header = document.querySelector('header');
    lightBoxMedia.innerHTML = '';
    const tagMmedia = document.createElement('video');
    const mediaPath = `assets/images/videos/${medias[index].video}`;
    tagMmedia.setAttribute('controls', '');
    // tagMmedia.setAttribute("autoplay", "");
    tagMmedia.setAttribute('muted', '');
    tagMmedia.setAttribute('src', mediaPath);
    tagMmedia.setAttribute('alt', medias[index].title);
            tagMmedia.setAttribute('aria-label', 'Video' + (index + 1) + ' on ' + medias.length + '. Title : ' + medias[index].title + '. Shooting date : ' + medias[index].date + '. Price : ' + medias[index].price + '€.')
            lightBoxMedia.appendChild(tagMmedia)
            const legend = document.querySelector('.lightbox_legend')
            legend.innerText = (index + 1) + '/' + medias.length + ' - ' + medias[index].title + ' - ' + medias[index].date + ' - ' + medias[index].price + '€'
            legend.setAttribute('tabindex', '-1')
            lightbox.classList.remove('hidden')
            lightbox.classList.add('show')
            lightbox.focus()
            main.setAttribute('aria-hidden', true)
            main.setAttribute('tabindex', '-1')
            header.setAttribute('tabindex', '-1')
            GestFocus()
    }

    function lightBoxPhoto(index) {
        // Keyboard navigation: Left/right arrows
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && lightbox.classList.contains('show')) {
                if (medias.length <= (index + 1)) {
                    if (medias[0].hasOwnProperty('video')) {
                        lightBoxVideo(0)
                    } else {
                        lightBoxPhoto(0)
                    }
                } else {
                    if (medias[(index + 1)].hasOwnProperty('video')) {
                        lightBoxVideo((index + 1))
                    } else {
                        lightBoxPhoto((index + 1))
                    }
                }
            };
            if (e.key === 'ArrowLeft' && lightbox.classList.contains('show')) {
                if (index <= 1) {
                    if (medias[medias.length - 1].hasOwnProperty('video')) {
                        lightBoxVideo(medias.length - 1)
                    } else {
                        lightBoxPhoto(medias.length - 1)
                    }
                } else {
                    if (medias[(index - 1)].hasOwnProperty('video')) {
                        lightBoxVideo((index - 1))
                    } else {
                        lightBoxPhoto((index - 1))
                    }
                }
            };
        })

      // Mouse navigation
        const next = document.querySelector('.next')
        next.onclick = () => {
            if (medias.length <= (index + 1)) {
                if (medias[0].hasOwnProperty('video')) {
                    lightBoxVideo(0)
                } else {
                    lightBoxPhoto(0)
                }
            } else {
                if (medias[(index + 1)].hasOwnProperty('video')) {
                    lightBoxVideo((index + 1))
                } else {
                    lightBoxPhoto((index + 1))
                }
            }
        }
        const previous = document.querySelector('.previous')
        previous.onclick = () => {
            if (index <= 1) {
                if (medias[medias.length - 1].hasOwnProperty('video')) {
                    lightBoxVideo(medias.length - 1)
                } else {
                    lightBoxPhoto(medias.length - 1)
                }
            } else {
                if (medias[(index - 1)].hasOwnProperty('video')) {
                    lightBoxVideo((index - 1))
                } else {
                    lightBoxPhoto((index - 1))
                }
            }
        }

        // Keyboard navigation: "Enter" key if the next button is in focus
        next.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (medias.length <= (index + 1)) {
                    if (medias[0].hasOwnProperty('video')) {
                        lightBoxVideo(0)
                        next.focus()
                    } else {
                        lightBoxPhoto(0)
                        next.focus()
                    }
                } else {
                    if (medias[(index + 1)].hasOwnProperty('video')) {
                        lightBoxVideo((index + 1))
                        next.focus()
                    } else {
                        lightBoxPhoto((index + 1))
                        next.focus()
                    }
                }
            };
        })
      // Keyboard navigation: "Enter" key if previous button has focus
        previous.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (index <= 1) {
                    if (medias[medias.length - 1].hasOwnProperty('video')) {
                        lightBoxVideo(medias.length - 1)
                        previous.focus()
                    } else {
                        lightBoxPhoto(medias.length - 1)
                        previous.focus()
                    }
                } else {
                    if (medias[(index - 1)].hasOwnProperty('video')) {
                        lightBoxVideo((index - 1))
                        previous.focus()
                    } else {
                        lightBoxPhoto((index - 1))
                        previous.focus()
                    }
                };
            };
        })

        

       // LightBox DOM creation and display
        const lightbox = document.querySelector('.lightbox_container')
        const lightBoxMedia = document.querySelector('.media')
        lightBoxMedia.setAttribute('tabindex', '0')
        const main = document.querySelector('main')
        const header = document.querySelector('header')
        lightBoxMedia.innerHTML = ''
        const tagMmedia = document.createElement('img')
        const mediaPath = `assets/images/photos/${medias[index].image}`
        tagMmedia.setAttribute('src', mediaPath)
        tagMmedia.setAttribute('alt', medias[index].title)
        tagMmedia.setAttribute('aria-label', 'Photo ' + (index + 1) + ' on ' + medias.length + '. Title : ' + medias[index].title + '. Shooting Date : ' + medias[index].date + '. Price : ' + medias[index].price + '€.')
        lightBoxMedia.appendChild(tagMmedia)
        const legend = document.querySelector('.lightbox_legend')
        legend.setAttribute('tabindex', '-1')
        legend.innerText = (index + 1) + '/' + medias.length + ' - ' + medias[index].title + ' - ' + medias[index].date + ' - ' + medias[index].price + '€'
        lightbox.classList.remove('hidden')
        lightbox.classList.add('show')
        lightbox.focus()
        main.setAttribute('aria-hidden', true)
        header.setAttribute('aria-hidden', true)
        main.setAttribute('tabindex', '-1')
        header.setAttribute('tabindex', '-1')
        GestFocus()
    }


function GestFocus() {
  //  Mouse navigation (using the "TAB" and "Shift + TAB" keys) :
    // "loop over controls */
    const media_modal = document.querySelector('.lightbox_container')
    const focusableElements = document.querySelectorAll('.media, .close i, .previous i, .next i')
    // focusableElements = Array.prototype.slice.call(focusableElements)
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    firstElement.focus()
    media_modal.addEventListener('keydown', tabKey)
    function tabKey(e) {
        const isTabPressed = e.key === 'Tab'
        if (!isTabPressed) {
            return
        }
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus()
                e.preventDefault()
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus()
                e.preventDefault()
            }
        }
    }
}
