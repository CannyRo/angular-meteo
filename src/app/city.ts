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
        public address: Address,
        public highlights?: Highlights,
        public position?: Position,
        public mapView?: MapView,
        public scoring?: Scoring,
    ){}
    
}

export class Address {
    constructor(
    public label: string,
    public countryCode: string,
    public countryName: string,
    public stateCode: string,
    public state: string,
    public county: string,
    public city: string,
    public postalCode: string,
    ){}
}

interface Foo {
    start: number;
    end: number;
}

interface AddressHighlights {
    label: Foo[];
    city: Foo[];
}

interface Highlights {
    title: Foo[];
    adress: AddressHighlights
}

export class Position {
    constructor(
    public lat: number,
    public lng: number,
    ){}
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
