sap.ui.define([
  "sap/ui/core/mvc/Controller", 
  "sap/ui/model/json/JSONModel", 
  "sap/ui/model/Filter", 
  "sap/ui/model/FilterOperator", 
  "sap/ui/core/UIComponent"
], function (Controller, JSONModel, Filter, FilterOperator, UIComponent) {
  "use strict";

  const App = Controller.extend("ui5.tutorial.walkthrough.controller.App", {
    onInit() {
      const viewModel = new JSONModel({
        currency: "EUR"
      });
      this.getView()?.setModel(viewModel, "view");
    },
    
    _filterTable() {
      const list = this.byId("invoiceList");
      const binding = list?.getBinding("items");
      binding?.filter(this._aFilters || []);
    },

    onFilterInvoices(event) {
      this._aFilters = this._aFilters || [];
      const query = event.getParameter("query");
      
      // Remove old product name filter if any
      this._aFilters = this._aFilters.filter(filter => filter.sPath !== "ProductName");

      if (query) {
        this._aFilters.push(new Filter("ProductName", FilterOperator.Contains, query));
      }

      this._filterTable();
    },

    onStatusFilter(event) {
      this._aFilters = this._aFilters || [];
      const selectedKey = event.getSource().getSelectedKey();

      // Remove old status filter if any
      this._aFilters = this._aFilters.filter(filter => filter.sPath !== "Status");

      if (selectedKey && selectedKey !== "All") {
        this._aFilters.push(new Filter("Status", FilterOperator.EQ, selectedKey));
      }

      this._filterTable();
    },

    onPress(event) {
      const item = event.getSource();
      const router = UIComponent.getRouterFor(this);
      router.navTo("detail", {
        invoicePath: window.encodeURIComponent(item.getBindingContext("invoice").getPath().substring(1))
      });
    }
  });
  return App;
});