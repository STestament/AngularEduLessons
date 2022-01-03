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
