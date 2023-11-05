export class CityList {
    constructor(
        public items: City[],
    ){}
}

export class City {
    constructor(
        public title: string,
        public id: string,
        public language: string,
        public resultType: string,
        public localityType: string,
        public adress: Adress,
        public highlights?: Highlights,
        public position?: Position,
        public mapView?: MapView,
        public scoring?: Scoring,
    ){}
    
}

interface Adress {
    label: string;
    countryCode: string;
    countryName: string;
    stateCode: string;
    state: string;
    county: string;
    city: string;
    postalCode: string;
}

interface Foo {
    start: number;
    end: number;
}

interface AdressHighlights {
    label: Foo[];
    city: Foo[];
}

interface Highlights {
    title: Foo[];
    adress: AdressHighlights
}

interface Position {
    lat: number;
    lng: number;
}

interface MapView {
    west: number;
    south: number;
    east: number;
    north: number;
}
interface FieldScore {
    city: number
}

interface Scoring {
    queryScore: number;
    fieldScore: FieldScore;
}
