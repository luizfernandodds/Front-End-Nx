package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class FuelControlDto implements Serializable {

	private Long id;
	private FuelTypeDto fuelType;
	private Double km_start;
	private Double km_final;
	private Double liters;
	private LocalDateTime date;
	private Double value;
	private TargetDto target;
	private CustomerDto customer;
	private String description;
	private LoginDto logInsert;
	private LocalDateTime dateCreate;
	private LocalDateTime dateDelete;
	private LoginDto logDeleted;
	private BigDecimal totalValue;

	public FuelControlDto() {
//		this.formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
//		this.locale = Locale.GERMAN;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		FuelControlDto other = (FuelControlDto) obj;
		return Objects.equals(id, other.id);
	}


}