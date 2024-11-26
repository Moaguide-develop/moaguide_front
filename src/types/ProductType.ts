import { IArtProductDetail } from './ArtProductType';
import { IBuildingProductDetail } from './BuildingProductType';
import { IContentProductDetail } from './ContentProductType';
import { ICowProductDetail } from './CowProductType';
import { IMusicProductDetail } from './MusicProductType';

export type ProductDetail = Partial<
  IBuildingProductDetail &
    IArtProductDetail &
    IMusicProductDetail &
    IContentProductDetail &
    ICowProductDetail
>;
