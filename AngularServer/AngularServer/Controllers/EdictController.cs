using AngularServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularServer.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class EdictController : ControllerBase
    {
        private EdictService _edictService;
        public EdictController(EdictService edictService)
        {
            _edictService = edictService;
        }

        [HttpPost]
        public EdictItem[] GetEdicts()
        {
            return _edictService.GetEdicts();
        }

        [HttpGet]
        public EdictItem[] SearchEdicts(string filterText)
        {
            if (!string.IsNullOrEmpty(filterText))
            {
                return _edictService.GetEdicts(filterText);
            }
            return _edictService.GetEdicts();
        }
        [HttpGet]
        public EdictItem[] FilterEdicts(string filterText, string filterType)
        {
            EdictItem[] edicts = new EdictItem[] { };
            if (!string.IsNullOrEmpty(filterText))
            {
                edicts = _edictService.GetEdicts(filterText);
            }
            else {
                edicts = _edictService.GetEdicts();
            }
            if (!string.IsNullOrEmpty(filterType))
            {
                edicts = _edictService.GetFilters(edicts, filterType);
            }
            return edicts;
        }

        [HttpPost]
        public int AddEdict(EdictItem edict)
        {
            var maxId = _edictService.AddEdict(edict);
            return maxId;
        }

        [HttpPost]
        public void UpdateEdict(EdictItem edict)
        {
            _edictService.UpdateEdict(edict);
        }

        [HttpPost]
        public void DeleteEdicts(int[] ids)
        {
            _edictService.DeleteEdicts(ids);
        }
    }
}
