sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/UIComponent",
  ],
  function (Controller, JSONModel, Filter, FilterOperator, UIComponent) {
    "use strict";

    return Controller.extend(
      "ui5.tutorial.walkthrough.controller.InvoiceList",
      {
        onInit() {
          const viewModel = new JSONModel({
            currency: "EUR",
          });
          this.getView().setModel(viewModel, "view");
        },

        onFilterInvoices() {
          const filters = [];

          const query = this.byId("searchField").getValue();
          if (query) {
            filters.push(
              new Filter("ProductName", FilterOperator.Contains, query),
            );
          }

          const statusKey = this.byId("statusFilter").getSelectedKey();
          if (statusKey) {
            filters.push(new Filter("Status", FilterOperator.EQ, statusKey));
          }

          this.byId("invoiceList").getBinding("items").filter(filters);
        },

        onPress(event) {
          const item = event.getSource();
          const router = UIComponent.getRouterFor(this);
          router.navTo("detail", {
            invoicePath: window.encodeURIComponent(
              item.getBindingContext("invoice").getPath().substring(1),
            ),
          });
        },
      },
    );
  },
);
