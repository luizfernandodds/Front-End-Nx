package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class SynopticItemDto implements Serializable {
	
	private static final long serialVersionUID = 378169157400013255L;
	private Long id;
	private SynopticDto synoptic;
	private Double subLimitMin;
	private Double subLimitMax;
	private SynopticTypeItemDto synopticTypeItem;
	private Integer quantity;
	private String note;
	private Integer idPanel;
	private Boolean status = false;
	private LocalDateTime dateDelete;
	
	public SynopticItemDto() {
		
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
		SynopticItemDto other = (SynopticItemDto) obj;
		return Objects.equals(id, other.id);
	}
}
