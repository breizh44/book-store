export interface BookDTO {
    //DTO = DataTransfertObject
    title: string;
    //author: string;
    year: number;
    genre: string;
}

export type Filter = {
    year: number | undefined;
    genre: string | undefined;
};
