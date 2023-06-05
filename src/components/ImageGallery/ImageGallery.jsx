import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ data }) => {

  return (
    
    <ul className="gallery">
      
      {data.map(({ id, webformatURL, tags, largeImageURL}) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            largeImageURL={largeImageURL}
           
          />
        );
      })}
    </ul>
  );
};
