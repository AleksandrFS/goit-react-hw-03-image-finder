import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ data }) => {
  return (
    <ul className="gallery">
      {data.map(({ id, webformatURL, tags }) => {
        return (
          <ImageGalleryItem key={id} webformatURL={webformatURL} tags={tags} />
        );
      })}
    </ul>
  );
};
