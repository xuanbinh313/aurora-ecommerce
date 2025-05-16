package domain

type ShippingInfo interface {
	GetWeight() float64
	GetType() string
}
type DomesticShippingInfo struct {
	Weight float64 `json:"weight"`
}

func (d DomesticShippingInfo) GetWeight() float64 {
	return d.Weight
}

func (d DomesticShippingInfo) GetType() string {
	return "domestic"
}

type InternationalShippingInfo struct {
	Weight          float64 `json:"weight"`
	CountryOfOrigin string  `json:"countryOfOrigin"`
	HSCode          string  `json:"hsCode"`
}

func (i InternationalShippingInfo) GetWeight() float64 {
	return i.Weight
}

func (i InternationalShippingInfo) GetType() string {
	return "international"
}
