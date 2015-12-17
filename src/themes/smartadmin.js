/**
 * Special theme for develop the appearance of the smartadmin html template.
 * Mixes bootstrap3 theme with special jquery-ui concepts.
 * @type {void|*}
 */
JSONEditor.defaults.themes.smartadmin = JSONEditor.AbstractTheme.extend({
  getSelectInput: function(options) {
    var el = this._super(options);
    el.className += 'form-control';
    //el.style.width = 'auto';
    return el;
  },
  setGridColumnSize: function(el,size) {
    el.className = 'col-md-'+size;
  },
  afterInputReady: function(input) {
    if(input.controlgroup) return;
    input.controlgroup = this.closest(input,'.form-group');
    if(this.closest(input,'.compact')) {
      input.controlgroup.style.marginBottom = 0;
    }

    // TODO: use bootstrap slider
  },
  getTextareaInput: function() {
    var el = document.createElement('textarea');
    el.className = 'form-control';
    return el;
  },
  getRangeInput: function(min, max, step) {
    // TODO: use better slider
    return this._super(min, max, step);
  },
  getFormInputField: function(type) {
    var el = this._super(type);
    if(type !== 'checkbox') {
      el.className += 'form-control';
    }
    return el;
  },
  /**
   * Function to define a field to enter a date.
   * @param type
   * @param extras
   * @returns {*}
   */
  getFormDatePickerInputField: function(type, extras) {
    var el = this.getFormInputField(type);
    if(type !== 'date') {
      return el;
    }
    var options = {
      prevText: '<i class="fa fa-chevron-left"></i>',
      nextText: '<i class="fa fa-chevron-right"></i>',
      onSelect: function (selectedDate) {
        if (window.jQuery && typeof window.jQuery(el).trigger === 'function') {
          window.jQuery(el).trigger('change');
        }
      }
    };
    var extraopts = extras || {};
    el.setAttribute('data-smart-datepicker', '');
    if(extraopts.defaultValue) {
      el.setAttribute('data-default-date', extraopts.defaultValue);
      options.defaultDate = extraopts.defaultValue;
    }
    if(extraopts.dateFormat) {
      el.setAttribute('data-date-format', extraopts.dateFormat);
      options.dateFormat = extraopts.dateFormat;
    }
    if(extraopts.minValue) {
      el.setAttribute('date-min-restrict', extraopts.minValue);
    }
    if(extraopts.maxValue) {
      el.setAttribute('date-max-restrict', extraopts.maxValue);
    }
    if (window.jQuery && typeof window.jQuery(el).datepicker === 'function') {
      window.jQuery(el).datepicker(options);
    }
    return el;
  },
  /**
   * Function to create a date field. It uses the component bootstrap-datetimepicker.
   * @param type
   * @param extras
   * @returns {*}
   */
  getFormDateInputField: function(type, extras) {
    return this.getFormDateTimeInputField(type, extras);
  },
  /**
   * Function to create a date-time field. It uses the component bootstrap-datetimepicker.
   * @param type
   * @param extras
   * @returns {*}
   */
  getFormDateTimeInputField: function(type, extras) {
    type = 'text';// Chrome workaround
    var el = this.getFormInputField(type);
    var options = {
      icons: {
        time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up  : "fa fa-arrow-up",
            down: "fa fa-arrow-down"
      },
      showClose: true,
      showClear: true,
      allowInputToggle: true
    };
    var extraopts = extras || {};
    el.setAttribute('data-datetimepicker', '');
    if(extraopts.dateFormat) {
      el.setAttribute('data-date-format', extraopts.dateFormat);
      options.format = extraopts.dateFormat;
    }
    if(extraopts.minValue) {
      el.setAttribute('date-min-restrict', extraopts.minValue);
      options.minDate = extraopts.minValue;
    }
    if(extraopts.maxValue) {
      el.setAttribute('date-max-restrict', extraopts.maxValue);
      options.maxDate = extraopts.maxValue;
    }
    if(extraopts.locale) {
      el.setAttribute('date-locale', extraopts.locale);
      options.locale = extraopts.locale;
    }
    if(extraopts.timezone) {
      el.setAttribute('date-timezone', extraopts.locale);
      options.timeZone = extraopts.timezone;
    }
    if (window.jQuery && typeof window.jQuery(el).datetimepicker === 'function') {
      window.jQuery(el).datetimepicker(options);
      var dtpicker = window.jQuery(el).data("DateTimePicker");
      if(extraopts.defaultValue) {
        el.setAttribute('data-default-date', extraopts.defaultValue);
        dtpicker.date(extraopts.defaultValue);
      }
      if (extraopts.changeListener) {
        window.jQuery(el).on("dp.change", function (e) {
          //window.console.log(e.date);
          if (typeof extraopts.changeListener === 'function') {
            var event = new CustomEvent('change', e);
            extraopts.changeListener(event);
          }
        });
      }
    }
    return el;
  },
  /**
   * Function to create a time-field. It uses component bootstrap-datetimepicker.
   * @param type
   * @param extras
   * @returns {*}
   */
  getFormTimeInputField: function(type, extras) {
    return this.getFormDateTimeInputField(type, extras);
  },
  getFormControl: function(label, input, description) {
    var group = document.createElement('div');

    if(label && input.type === 'checkbox') {
      group.className += ' checkbox';
      label.appendChild(input);
      label.style.fontSize = '14px';
      group.style.marginTop = '0';
      group.appendChild(label);
      input.style.position = 'relative';
      input.style.cssFloat = 'left';
    } 
    else {
      group.className += ' form-group';
      if(label) {
        label.className += ' control-label';
        group.appendChild(label);
      }
      group.appendChild(input);
    }

    if(description) group.appendChild(description);

    return group;
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'well well-sm';
    el.style.paddingBottom = 0;
    return el;
  },
  getFormInputDescription: function(text) {
    var el = document.createElement('p');
    el.className = 'help-block';
    el.innerHTML = text;
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.marginLeft = '10px';
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'btn-group';
    return el;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.className += 'btn btn-default';
    return el;
  },
  getTable: function() {
    var el = document.createElement('table');
    el.className = 'table table-bordered';
    el.style.width = 'auto';
    el.style.maxWidth = 'none';
    return el;
  },

  addInputError: function(input,text) {
    if(!input.controlgroup) return;
    input.controlgroup.className += ' has-error';
    if(!input.errmsg) {
      input.errmsg = document.createElement('p');
      input.errmsg.className = 'help-block errormsg';
      input.controlgroup.appendChild(input.errmsg);
    }
    else {
      input.errmsg.style.display = '';
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.errmsg) return;
    input.errmsg.style.display = 'none';
    input.controlgroup.className = input.controlgroup.className.replace(/\s?has-error/g,'');
  },
  getTabHolder: function() {
    var el = document.createElement('div');
    el.innerHTML = "<div class='tabs list-group col-md-2'></div><div class='col-md-10'></div>";
    el.className = 'rows';
    return el;
  },
  getTab: function(text) {
    var el = document.createElement('a');
    el.className = 'list-group-item';
    el.setAttribute('href','#');
    el.appendChild(text);
    return el;
  },
  markTabActive: function(tab) {
    tab.className += ' active';
  },
  markTabInactive: function(tab) {
    tab.className = tab.className.replace(/\s?active/g,'');
  },
  getProgressBar: function() {
    var min = 0, max = 100, start = 0;

    var container = document.createElement('div');
    container.className = 'progress';

    var bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-valuenow', start);
    bar.setAttribute('aria-valuemin', min);
    bar.setAttribute('aria-valuenax', max);
    bar.innerHTML = start + "%";
    container.appendChild(bar);

    return container;
  },
  updateProgressBar: function(progressBar, progress) {
    if (!progressBar) return;

    var bar = progressBar.firstChild;
    var percentage = progress + "%";
    bar.setAttribute('aria-valuenow', progress);
    bar.style.width = percentage;
    bar.innerHTML = percentage;
  },
  updateProgressBarUnknown: function(progressBar) {
    if (!progressBar) return;

    var bar = progressBar.firstChild;
    progressBar.className = 'progress progress-striped active';
    bar.removeAttribute('aria-valuenow');
    bar.style.width = '100%';
    bar.innerHTML = '';
  }
});
