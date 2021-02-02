export interface Content {
    rendered:  string;
    protected: boolean;
}

export interface Post {
    id: number;
    title: Content;
    content: Content;
    excerpt: Content;
    modified: string;
    date: string;
    fimg_url?: string; 
}

export interface Page extends Post{
    
}

export interface Event extends Post{
    date: string;
    link: string;
    location: string;
    time: string;
    fimg_url?: string; 
}

export interface Category {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
    parent: number;
}

// Generic Search Parameters Base Type
export interface SearchParams {
    id?: number;
    per_page?: Content;
    search?: string;
    order?: string;
    orderby?: string;
    type?: "simple" | "variable" | "grouped";
    page?: number;
}

export interface CategorySearchParams extends SearchParams{
    taxonomy?: string;
    tag?: string;
    slug?: string;
    parent?: number;
}

export interface EventSearchParams extends SearchParams
{
    date?: string;
}

export interface PageSearchParams extends SearchParams
{
}

export interface PostSearchParams extends SearchParams
{
}