PrimeFaces.widget.DataTable.prototype.bindSelectionKeyEvents = function() {
        var $this = this;

        this.getFocusableTbody().on('focus', function(e) {
            //ignore mouse click on row
            if(!$this.mousedownOnRow) {
                $this.focusedRow = $this.tbody.children('tr.ui-widget-content.ui-datatable-selectable.ui-state-highlight').eq(0);
                if ($this.focusedRow.length == 0) {
                    $this.focusedRow = $this.tbody.children('tr.ui-widget-content.ui-datatable-selectable').eq(0);
                }

                $this.highlightFocusedRow();

                if($this.cfg.scrollable) {
                    PrimeFaces.scrollInView($this.scrollBody, $this.focusedRow);
                }
            }
        })
        .on('blur', function() {
            if($this.focusedRow) {
                $this.unhighlightFocusedRow();
                $this.focusedRow = null;
            }
        })
        .on('keydown', function(e) {
            var keyCode = $.ui.keyCode,
            key = e.which;

            if($(e.target).is(':input') && $this.cfg.editable) {
                return;
            }

            if($this.focusedRow) {
                switch(key) {
                    case keyCode.UP:
                    case keyCode.DOWN:
                        var rowSelector = 'tr.ui-widget-content.ui-datatable-selectable',
                        row = key === keyCode.UP ? $this.focusedRow.prev(rowSelector) : $this.focusedRow.next(rowSelector);

                        if(row.length) {
                            $this.unhighlightFocusedRow();

                            if($this.isCheckboxSelectionEnabled()) {
                                row.find('> td.ui-selection-column .ui-chkbox input').focus();
                            }
                            else {
                                $this.focusedRow = row;
                            }

                            $this.highlightFocusedRow();

                            if($this.cfg.scrollable) {
                                PrimeFaces.scrollInView($this.scrollBody, $this.focusedRow);
                            }

                            e.target = $this.focusedRow.children().eq(0).get(0);
                            $this.onRowClick(e,$this.focusedRow.get(0));
                        }
                        e.preventDefault();
                    break;

                    case keyCode.ENTER:
                    case keyCode.SPACE:
                        if($this.focusedRowWithCheckbox) {
                            $this.focusedRow.find('> td.ui-selection-column .ui-chkbox .ui-chkbox-box').trigger('click.dataTable');
                        }
                        else {
                            e.target = $this.focusedRow.children().eq(0).get(0);
                            $this.onRowClick(e,$this.focusedRow.get(0));
                        }

                        e.preventDefault();
                    break;

                    default:
                    break;
                };
            }
        });

    };
    
    /**
     * This function scrolls the selected Item of a 
     * <p:dataTable id="idDataTable" selectionMode="single" 
     * into the visible area
     * <p:dataTable renderes to a scroll-container with the css-class: ui-datatable-scrollable-body (inside the element with the id : "idDataTable")
     * and to a container holding all items with the id: "idDataTable"_data
     * 
     *  Call this function for example after an ajax request that manipulated the content of your datatable:
     *  
     *    autoScrollPDatatable('mainForm:deptTbl');
     *  
     *  https://stackoverflow.com/questions/20214927/primefaces-datatable-scroll-down-to-position
     *
     * @param idDataTable   z.B.: idForm:idDataTable
     */
    function autoScrollPDatatable(idDataTable) {
    	console.log('autoScrollPDatatable() call, idDataTable = ' + idDataTable);
        // for selection in JQuery the ids with : must be endoded with \\:
    	   // - ova naredba menja samo prvu pojavu dvotacke:
        //var primfcid = idDataTable.replace(':', '\\:');
    	// ova menja sve pojave, tj, ispred svake dvotacke stavlja kosu crtu:
    	var primfcid = idDataTable.replace(/:/g, '\\:');
        var idDataTbl = '#' + primfcid;
        var idDataContainer = idDataTbl  + "_data";
        console.log('idDataTbl = ' + idDataTbl);

        var totalHeight = $(idDataTbl + " .ui-datatable-scrollable-body").height();
        var lichildren = $(idDataContainer).children("tr");
        var itemHeight = $(idDataContainer).children("tr").height();
        var anzItems = lichildren.length;
        var anzVisItems = totalHeight / itemHeight;
        var selItem = detectDataTableScrollPos(lichildren); 
        if(selItem == -1)
        {
            // no selection found...
            return;
        }
        console.log(' --1 ');

        var maxScrollItem = anzItems - anzVisItems;
        var scrollTopInPx; 
        if(selItem >= maxScrollItem)
        {
            // scroll table to the bottom
            scrollTopInPx = maxScrollItem * itemHeight;
        }
        else if(selItem < 2)
        {
            // scroll table to the top
            scrollTopInPx = 0;
        }
        else
        {
            // scroll selected item to the 1.2 th position
            scrollTopInPx = (selItem - 1.2) * itemHeight;
        }
        console.log(' --2 ');


        $(idDataTbl + " .ui-datatable-scrollable-body").animate({scrollTop:scrollTopInPx}, scrollTopInPx);
        console.log(' --3 ');
        
    }


    function detectDataTableScrollPos(liChildren)    {
    	console.log(' detect() begin');
        for (i=0;i< liChildren.length;++i)
        {
            var chd = liChildren[i];
            var x = chd.getAttribute("aria-selected");
            if(x === "true") {
            	console.log(' detect() vraca : ' + i);
                return i;
            }
        }
    	console.log(' detect() vraca -1');
        return -1;
    }

// ==================

